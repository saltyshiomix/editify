export type EditorEvent = 'change' | 'selectionchange';

export interface CurrentState {
  element: HTMLElement | null;
  style: {
    bold: boolean;
  };
}

let selectStart = false;
let currentCaretPosition = 0;

export class Editify {
  private readonly editor!: HTMLElement;
  private readonly toolbarBold!: HTMLElement;

  private readonly currentState: CurrentState = {
    element: null,
    style: {
      bold: false,
    },
  };

  constructor(id: string) {
    const editor = document.getElementById(id);
    if (editor) {
      this.editor = editor;
      this.editor.contentEditable = 'true';

      document.addEventListener('pointerup', (_e) => {
        const selection = document.getSelection();
        if (selection) {
          for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i);
            const el = range.commonAncestorContainer.parentElement;
            if (el === this.editor) {
              //
              // this scope is editor element
              //
            } else {
              if (el) {
                this.currentState.element = el;

                const style = getComputedStyle(el);
                this.currentState.style.bold = 400 < ~~style.getPropertyValue('font-weight');
              }
            }
          }
        }
      });
    }

    const toolbarBold = document.getElementById('toolbar-bold');
    if (toolbarBold) {
      this.toolbarBold = toolbarBold;
      this.toolbarBold.addEventListener('click', this.toggleBold);
    }
  }

  on = (event: EditorEvent, fn: (...args: any) => void) => {
    if (event === 'change') {
      this.editor.addEventListener('keyup', (e) => this.onKeyUp(e, fn));
    }

    if (event === 'selectionchange') {
      this.editor.addEventListener('selectstart', this.onSelectStart);
      this.editor.addEventListener('mouseup', (e) => this.onMouseUp(e, fn));
    }
  };

  off = (event: EditorEvent, fn: (...args: any) => void) => {
    if (event === 'change') {
      this.editor.removeEventListener('keyup', (e) => this.onKeyUp(e, fn));
    }

    if (event === 'selectionchange') {
      this.editor.removeEventListener('selectstart', this.onSelectStart);
      this.editor.removeEventListener('mouseup', (e) => this.onMouseUp(e, fn));
    }
  };

  private onKeyUp = (e: KeyboardEvent, onChange: (newHtml?: string, newText?: string) => void) => {
    // omit IME events
    if ((e.isComposing || e.keyCode === 229) && !(e.code === 'Enter' && e.keyCode === 229)) {
      return;
    }

    if (!onChange) {
      return;
    }

    const lastCaretPosition = currentCaretPosition;
    const nextCaretPosition = this.getCaretPosition(this.editor);
    const target = e.target as HTMLElement;
    const newHtml = target.innerHTML;
    const newText = target.textContent?.substring(lastCaretPosition, nextCaretPosition);
    currentCaretPosition = nextCaretPosition;

    onChange(newHtml, newText);
  };

  private onSelectStart = () => {
    selectStart = true;
  };

  private onMouseUp = (_e: MouseEvent, onSelectionChange: (e: any) => void) => {
    currentCaretPosition = this.getCaretPosition(this.editor);

    if (selectStart) {
      if (onSelectionChange) {
        onSelectionChange(document.getSelection());
      }
      selectStart = false;
    }
  };

  private getCaretPosition = (target: any): number => {
    const range = document.getSelection()?.getRangeAt(0);
    const r = range?.cloneRange();
    if (r) {
      r.selectNodeContents(target);
      r.setEnd(range!.endContainer, range!.endOffset);
      return r.toString().length;
    }
    return -1;
  };

  private toggleBold = () => {
    this.currentState.style.bold = !this.currentState.style.bold;
    const selection = document.getSelection();
    const text = selection?.toString();
    const range = selection?.getRangeAt(0);
    range?.deleteContents();
    const fragment = range?.createContextualFragment(
      this.currentState.style.bold
      ? `<b>${text}</b>`
      : text!
    );
    const firstInsertedNode = fragment?.firstChild;
    const lastInsertedNode = fragment?.lastChild;
    range?.insertNode(fragment!);
    range?.setStartBefore(firstInsertedNode!);
    range?.setEndAfter(lastInsertedNode!);
    selection?.removeAllRanges();
    selection?.addRange(range!);
  };
}
