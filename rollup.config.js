import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonJS from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default {
  input: './index.ts', // 진입 경로
  output: {
    file: './dist/bundle.js', // 출력 경로
    format: 'es', // 출력 형식
    sourcemap: true, // 소스 맵을 켜놔서 디버깅을 쉽게 만들자
  },
  plugins: [
    // 바벨 트랜스파일러 설정
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    // peerDependency로 설치된 라이브러리의 코드가 번들링된 결과에 포함되지 않고, import 구문으로 불러와서 사용할 수 있게 만듦
    peerDepsExternal(),
    // CommonJS 로 작성된 모듈들을 ES6 바꾸어서 rollup이 해석할 수 있게 함
    commonJS(),
    // 외부 모듈에 대해서도 Tree shaking을 적용
    nodeResolve(),
    // 타입스크립트
    typescript(),
  ],
}
