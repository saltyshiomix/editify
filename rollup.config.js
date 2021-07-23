import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const input = 'index.ts';

const plugins = [
  typescript(),
  (process.env.NODE_ENV === 'production' && terser()),
];

export default {
  input,
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
  plugins,
};
