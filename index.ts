export type EditorEvent = 'change' | 'selectionchange';

let selectStart = false;
let currentCaretPosition = 0;

export class Editify {
  private readonly editor!: HTMLElement;

  constructor(id: string) {
    const editor = document.getElementById(id);

    if (editor) {
      this.editor = editor;
      this.editor.contentEditable = 'true';

      document.addEventListener('pointerup', (_e) => {
        const selection = window.getSelection();
        if (selection) {
          for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i);
            const el = range.commonAncestorContainer.parentElement;
            if (this.editor === el) {
              //
              // this scope is editor element
              //
            } else {
              if (el) {
                const style = getComputedStyle(el);
                console.log('font-weight: ', style.getPropertyValue('font-weight'));
                console.log('color: ', style.getPropertyValue('color'));
              }
            }
          }
        }
      });
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

  // private onKeyDown = (e: KeyboardEvent) => {};

  private onKeyUp = (e: KeyboardEvent, onChange: (newHtml?: string, newText?: string) => void) => {
    // omit IME events
    if ((e.isComposing || e.keyCode === 229) && !(e.code === 'Enter' && e.keyCode === 229)) {
      return;
    }

    const oldCaretPosition = currentCaretPosition;
    const nextCaretPosition = this.getCaretPosition(this.editor);
    const target = e.target as HTMLElement;
    const newHtml = target.innerHTML;
    const newText = target.textContent?.substring(oldCaretPosition, nextCaretPosition);
    currentCaretPosition = nextCaretPosition;

    if (onChange) {
      onChange(newHtml, newText);
    }
  };

  private onSelectStart = () => {
    selectStart = true;
  };

  private onMouseUp = (_e: MouseEvent, onSelectionChange: (e: any) => void) => {
    currentCaretPosition = this.getCaretPosition(this.editor);

    if (selectStart) {
      if (onSelectionChange) {
        onSelectionChange(window.getSelection());
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
}
