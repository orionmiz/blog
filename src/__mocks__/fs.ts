import path from 'path'

interface MockedFileSystem {
  __mockFiles: {
    [name: string]: string[]
  }
  __setMockFiles: (newMockFiles: string[]) => void
  readdirSync: (directoryPath: string) => {}
}

const fs = jest.genMockFromModule<MockedFileSystem>('fs');

// 이것은 "mock" 파일시스템에서 파일이 `fs` API가 사용될 때
// 무엇처렴 보여야 하는지를 명시하기 위해
// 설정 중에 사용할 수 있는 사용자 정의 함수입니다.
let mockFiles: {
  [name: string]: string[]
} = Object.create(null);
function __setMockFiles(newMockFiles: string[]) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

// __setMockFiles를 통해 설정된
// 특정 모의 파일 리스트로부터 읽는
// `readdirSync`의 사용자 정의 버전
function readdirSync(directoryPath: string) {
  return mockFiles[directoryPath] || [];
}

fs.__mockFiles = mockFiles;
fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

export default fs;