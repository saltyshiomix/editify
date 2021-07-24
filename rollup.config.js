import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.ts',
  output: [
    {
      file: 'index.js',
      format: 'cjs',
    },
    {
      name: 'Editify',
      file: 'editify.js',
      format: 'umd',
    },
  ],
  plugins: [
    typescript(),
    (process.env.NODE_ENV === 'production' && terser()),
  ],
};
