import { Terminal, GitBranch, Download, FileCode, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '../../src/components/Card';
import { Badge } from '../../src/components/Badge';
import { Alert } from '../../src/components/Alert';
import { Tabs } from '../../src/components/Tabs';
import { Accordion } from '../../src/components/Accordion';

export default function InstallationGuide() {
  return (
    <section className="demo-section">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>설치 가이드</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          @gractor/ui 라이브러리를 프로젝트에 설치하는 방법을 안내합니다.
        </p>

        {/* Prerequisites */}
        <Card style={{ marginBottom: '32px', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={24} />
            사전 요구사항
          </h2>
          <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
            설치하기 전에 다음 사항을 확인하세요:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Badge variant="info" style={{ marginBottom: '8px' }}>Required</Badge>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-default)' }}>
                  <strong>Node.js:</strong> 18.0.0 이상
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-default)' }}>
                  <strong>npm:</strong> 9.0.0 이상
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-default)' }}>
                  <strong>Git:</strong> 2.0.0 이상
                </li>
                <li style={{ padding: '8px 0' }}>
                  <strong>React:</strong> 18.0.0 또는 19.0.0 이상
                </li>
              </ul>
            </div>
            <div>
              <Badge variant="default" style={{ marginBottom: '8px' }}>Version Check</Badge>
              <pre style={{
                background: 'var(--surface-secondary)',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '13px',
                overflow: 'auto'
              }}>
                <code>{`# 버전 확인
node --version   # v18.0.0+
npm --version    # 9.0.0+
git --version    # 2.0.0+`}</code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Git Installation */}
        <Card style={{ marginBottom: '32px', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitBranch size={24} />
            Git 설치
          </h2>
          <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Git이 설치되어 있지 않다면 운영체제에 맞는 방법으로 설치하세요:
          </p>

          <Tabs
            items={[
              {
                id: 'windows',
                label: 'Windows',
                content: (
                  <div style={{ padding: '16px 0' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>방법 1:</strong> 공식 설치 프로그램 다운로드
                    </p>
                    <Alert variant="info" style={{ marginBottom: '16px' }}>
                      <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-info-600)' }}>
                        https://git-scm.com/download/win
                      </a>
                    </Alert>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>방법 2:</strong> Chocolatey 패키지 매니저 사용
                    </p>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>
                      <code>choco install git</code>
                    </pre>
                  </div>
                ),
              },
              {
                id: 'macos',
                label: 'macOS',
                content: (
                  <div style={{ padding: '16px 0' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>방법 1:</strong> Homebrew 사용 (권장)
                    </p>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      <code>brew install git</code>
                    </pre>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>방법 2:</strong> 공식 설치 프로그램 다운로드
                    </p>
                    <Alert variant="info">
                      <a href="https://git-scm.com/download/mac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-info-600)' }}>
                        https://git-scm.com/download/mac
                      </a>
                    </Alert>
                  </div>
                ),
              },
              {
                id: 'linux',
                label: 'Linux',
                content: (
                  <div style={{ padding: '16px 0' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>Ubuntu / Debian:</strong>
                    </p>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      <code>sudo apt-get update{'\n'}sudo apt-get install git</code>
                    </pre>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>CentOS / Fedora / RHEL:</strong>
                    </p>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>
                      <code>sudo yum install git</code>
                    </pre>
                  </div>
                ),
              },
            ]}
          />
        </Card>

        {/* Installation Methods */}
        <Card style={{ marginBottom: '32px', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={24} />
            설치 방법
          </h2>

          <Accordion
            items={[
              {
                id: 'github-install',
                title: '방법 1: GitHub에서 직접 설치 (권장)',
                content: (
                  <div>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      가장 간단한 방법입니다. npm이 자동으로 GitHub 저장소에서 패키지를 다운로드합니다.
                    </p>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      <code>{`# 최신 main 브랜치 설치
npm install github:Gwang-eon/ui-library

# 또는 HTTPS URL 사용
npm install git+https://github.com/Gwang-eon/ui-library.git`}</code>
                    </pre>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <Badge variant="success">장점</Badge>
                        <ul style={{ marginTop: '8px', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                          <li>빠르고 간편한 설치</li>
                          <li>항상 최신 버전 사용</li>
                          <li>package.json에 자동 등록</li>
                        </ul>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Badge variant="warning">단점</Badge>
                        <ul style={{ marginTop: '8px', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                          <li>소스 코드 수정 불가</li>
                          <li>로컬 개발 시 실시간 반영 불가</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: 'branch-install',
                title: '방법 2: 특정 브랜치/태그 설치',
                content: (
                  <div>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      특정 버전이나 브랜치를 설치할 수 있습니다.
                    </p>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>
                      <code>{`# 특정 브랜치 설치
npm install github:Gwang-eon/ui-library#develop

# 특정 태그/릴리스 설치
npm install github:Gwang-eon/ui-library#v1.2.2

# 특정 커밋 해시 설치
npm install github:Gwang-eon/ui-library#b37917c`}</code>
                    </pre>
                  </div>
                ),
              },
              {
                id: 'local-install',
                title: '방법 3: Git Clone 후 로컬 설치 (개발용)',
                content: (
                  <div>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      라이브러리를 수정하거나 기여하려는 경우 이 방법을 사용하세요.
                    </p>
                    <div style={{ marginBottom: '16px' }}>
                      <strong>1. 저장소 클론</strong>
                      <pre style={{
                        background: 'var(--surface-secondary)',
                        padding: '16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        marginTop: '8px'
                      }}>
                        <code>{`# HTTPS 클론
git clone https://github.com/Gwang-eon/ui-library.git

# 클론한 디렉토리로 이동
cd ui-library`}</code>
                      </pre>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <strong>2. 의존성 설치 및 빌드</strong>
                      <pre style={{
                        background: 'var(--surface-secondary)',
                        padding: '16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        marginTop: '8px'
                      }}>
                        <code>{`npm install
npm run build`}</code>
                      </pre>
                    </div>
                    <div>
                      <strong>3. 프로젝트에 로컬 경로로 연결</strong>
                      <pre style={{
                        background: 'var(--surface-secondary)',
                        padding: '16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        marginTop: '8px'
                      }}>
                        <code>{`cd /path/to/your-project
npm install /path/to/ui-library`}</code>
                      </pre>
                    </div>
                  </div>
                ),
              },
              {
                id: 'npm-link',
                title: '방법 4: npm link 사용 (개발용 - 고급)',
                content: (
                  <div>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      라이브러리를 여러 프로젝트에서 동시에 개발할 때 유용합니다.
                    </p>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>
                      <code>{`# 1. ui-library 디렉토리에서
cd /path/to/ui-library
npm link

# 2. 프로젝트 디렉토리에서
cd /path/to/your-project
npm link @gractor/ui

# 링크 해제
npm unlink @gractor/ui`}</code>
                    </pre>
                  </div>
                ),
              },
            ]}
          />
        </Card>

        {/* Setup After Installation */}
        <Card style={{ marginBottom: '32px', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode size={24} />
            설치 후 설정
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>1. CSS 파일 임포트</h3>
            <Alert variant="warning" style={{ marginBottom: '12px' }}>
              <strong>중요:</strong> CSS 파일 임포트 순서를 반드시 지켜주세요. all.css를 먼저, ui.css를 나중에 임포트해야 합니다.
            </Alert>

            <Tabs
              items={[
                {
                  id: 'nextjs-app',
                  label: 'Next.js App Router',
                  content: (
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      marginTop: '12px'
                    }}>
                      <code>{`// app/layout.tsx
import '@gractor/ui/dist/styles/all.css';
import '@gractor/ui/dist/ui.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}`}</code>
                    </pre>
                  ),
                },
                {
                  id: 'nextjs-pages',
                  label: 'Next.js Pages Router',
                  content: (
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      marginTop: '12px'
                    }}>
                      <code>{`// pages/_app.tsx
import '@gractor/ui/dist/styles/all.css';
import '@gractor/ui/dist/ui.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}`}</code>
                    </pre>
                  ),
                },
                {
                  id: 'vite',
                  label: 'Vite / CRA',
                  content: (
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      marginTop: '12px'
                    }}>
                      <code>{`// main.tsx 또는 index.tsx
import '@gractor/ui/dist/styles/all.css';
import '@gractor/ui/dist/ui.css';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(<App />);`}</code>
                    </pre>
                  ),
                },
              ]}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>2. 컴포넌트 사용</h3>
            <pre style={{
              background: 'var(--surface-secondary)',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '13px'
            }}>
              <code>{`import { Button, Input, Card, DataGrid, Badge } from '@gractor/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="검색..." />
      <Button variant="primary">제출</Button>
      <Badge variant="success">활성</Badge>
    </Card>
  );
}`}</code>
            </pre>
          </div>
        </Card>

        {/* Troubleshooting */}
        <Card style={{ marginBottom: '32px', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={24} />
            트러블슈팅
          </h2>

          <Accordion
            items={[
              {
                id: 'trouble-1',
                title: '문제 1: "Cannot find module \'@gractor/ui\'"',
                content: (
                  <div>
                    <Badge variant="error" style={{ marginBottom: '8px' }}>원인</Badge>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      패키지가 제대로 설치되지 않았거나 node_modules가 손상됨
                    </p>
                    <Badge variant="success" style={{ marginBottom: '8px' }}>해결책</Badge>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>
                      <code>{`# node_modules 및 package-lock.json 삭제
rm -rf node_modules package-lock.json

# 캐시 정리
npm cache clean --force

# 재설치
npm install
npm install github:Gwang-eon/ui-library`}</code>
                    </pre>
                  </div>
                ),
              },
              {
                id: 'trouble-2',
                title: '문제 2: "Git is not installed" 에러',
                content: (
                  <div>
                    <Badge variant="error" style={{ marginBottom: '8px' }}>원인</Badge>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      Git이 시스템에 설치되지 않음
                    </p>
                    <Badge variant="success" style={{ marginBottom: '8px' }}>해결책</Badge>
                    <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                      <li>Git 설치: <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-500)' }}>https://git-scm.com/downloads</a></li>
                      <li>설치 후 터미널 재시작</li>
                      <li>git --version으로 설치 확인</li>
                      <li>npm install 재실행</li>
                    </ol>
                  </div>
                ),
              },
              {
                id: 'trouble-3',
                title: '문제 3: CSS 스타일이 적용되지 않음',
                content: (
                  <div>
                    <Badge variant="error" style={{ marginBottom: '8px' }}>원인</Badge>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      CSS 파일 임포트가 누락되었거나 순서가 잘못됨
                    </p>
                    <Badge variant="success" style={{ marginBottom: '8px' }}>해결책</Badge>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>
                      <code>{`// 올바른 순서로 임포트
import '@gractor/ui/dist/styles/all.css';  // 1번째
import '@gractor/ui/dist/ui.css';          // 2번째`}</code>
                    </pre>
                  </div>
                ),
              },
              {
                id: 'trouble-4',
                title: '문제 4: React 버전 충돌',
                content: (
                  <div>
                    <Badge variant="error" style={{ marginBottom: '8px' }}>원인</Badge>
                    <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      Peer dependency 불일치
                    </p>
                    <Badge variant="success" style={{ marginBottom: '8px' }}>해결책</Badge>
                    <pre style={{
                      background: 'var(--surface-secondary)',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>
                      <code>{`# React 버전 확인
npm list react

# React 18 또는 19로 업그레이드
npm install react@18 react-dom@18

# 또는 강제 설치 (권장하지 않음)
npm install --legacy-peer-deps`}</code>
                    </pre>
                  </div>
                ),
              },
            ]}
          />
        </Card>

        {/* Next Steps */}
        <Card style={{ padding: '24px', background: 'var(--color-primary-50)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>다음 단계</h2>
          <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
            설치가 완료되었다면 다음 리소스를 확인하세요:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--surface-primary)', borderRadius: '8px' }}>
              <strong>📖 사용 가이드</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                컴포넌트 사용법
              </p>
            </div>
            <div style={{ padding: '12px', background: 'var(--surface-primary)', borderRadius: '8px' }}>
              <strong>🎨 디자인 토큰</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                색상, 간격, 타이포그래피
              </p>
            </div>
            <div style={{ padding: '12px', background: 'var(--surface-primary)', borderRadius: '8px' }}>
              <strong>🚀 데모</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                인터랙티브 컴포넌트 데모
              </p>
            </div>
            <div style={{ padding: '12px', background: 'var(--surface-primary)', borderRadius: '8px' }}>
              <strong>🤝 기여 가이드</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                라이브러리 기여 방법
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
