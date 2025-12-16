/**
 * FileUpload 컴포넌트 테스트
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { FileUpload } from './FileUpload';

// Helper to create mock File
const createMockFile = (
  name: string,
  size: number,
  type: string
): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

// Helper to create DataTransfer with files
const createDataTransfer = (files: File[]): DataTransfer => {
  const dataTransfer = {
    files: {
      length: files.length,
      item: (index: number) => files[index],
      [Symbol.iterator]: function* () {
        for (const file of files) yield file;
      },
    } as unknown as FileList,
    items: files.map((file) => ({
      kind: 'file',
      type: file.type,
      getAsFile: () => file,
    })),
    types: ['Files'],
    setData: vi.fn(),
    getData: vi.fn(),
    clearData: vi.fn(),
    dropEffect: 'none' as DataTransfer['dropEffect'],
    effectAllowed: 'all' as DataTransfer['effectAllowed'],
    setDragImage: vi.fn(),
  };
  return dataTransfer as unknown as DataTransfer;
};

describe('FileUpload', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('FileUpload가 렌더링됨', () => {
      render(<FileUpload />);

      expect(screen.getByRole('button', { name: 'File upload area' })).toBeInTheDocument();
    });

    it('label이 렌더링됨', () => {
      render(<FileUpload label="Upload Files" />);

      expect(screen.getByText('Upload Files')).toBeInTheDocument();
    });

    it('helperText가 렌더링됨', () => {
      render(<FileUpload helperText="Max 10MB" />);

      expect(screen.getByText('Max 10MB')).toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      render(<FileUpload className="custom-upload" />);

      expect(document.querySelector('.custom-upload')).toBeInTheDocument();
    });

    it('disabled 상태가 적용됨', () => {
      render(<FileUpload disabled />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });
      expect(uploadArea).toHaveAttribute('tabIndex', '-1');
      expect(document.querySelector('[class*="disabled"]')).toBeInTheDocument();
    });

    it('커스텀 uploadText가 표시됨', () => {
      render(<FileUpload uploadText="Drop files here" />);

      expect(screen.getByText('Drop files here')).toBeInTheDocument();
    });

    it('hintText가 표시됨', () => {
      render(<FileUpload hintText="PNG, JPG up to 5MB" />);

      expect(screen.getByText('PNG, JPG up to 5MB')).toBeInTheDocument();
    });

    it('커스텀 icon이 표시됨', () => {
      render(<FileUpload icon={<span data-testid="custom-icon">📁</span>} />);

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('useNativeInput', () => {
    it('useNativeInput=true면 native input이 표시됨', () => {
      render(<FileUpload useNativeInput />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.style.display).not.toBe('none');
    });

    it('useNativeInput=false면 hidden input 사용', () => {
      render(<FileUpload useNativeInput={false} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.style.display).toBe('none');
    });
  });

  describe('파일 선택', () => {
    it('파일 선택시 onFilesChange가 호출됨', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
      });
    });

    it('multiple=true면 여러 파일 선택 가능', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload multiple onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('multiple');
    });

    it('multiple=false면 하나의 파일만 처리됨', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload multiple={false} onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = createMockFile('test1.txt', 1024, 'text/plain');
      const file2 = createMockFile('test2.txt', 1024, 'text/plain');

      const fileList = {
        0: file1,
        1: file2,
        length: 2,
        item: (i: number) => [file1, file2][i],
        [Symbol.iterator]: function* () {
          yield file1;
          yield file2;
        },
      } as unknown as FileList;

      fireEvent.change(input, { target: { files: fileList } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        // Only first file should be processed
        const calledWith = handleFilesChange.mock.calls[0][0];
        expect(calledWith.length).toBe(1);
      });
    });

    it('accept 속성이 적용됨', () => {
      render(<FileUpload accept="image/*,.pdf" />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('accept', 'image/*,.pdf');
    });
  });

  describe('파일 크기 검증', () => {
    it('maxSize를 초과하면 에러가 표시됨', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload maxSize={1024} onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const largeFile = createMockFile('large.txt', 2048, 'text/plain');

      fireEvent.change(input, { target: { files: [largeFile] } });

      await waitFor(() => {
        expect(screen.getByText(/File size exceeds/)).toBeInTheDocument();
      });
    });

    it('maxSize 이내면 정상 처리됨', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload maxSize={5000} onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const smallFile = createMockFile('small.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [smallFile] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        expect(screen.queryByText(/File size exceeds/)).not.toBeInTheDocument();
      });
    });
  });

  describe('파일 타입 검증', () => {
    it('허용되지 않은 파일 타입이면 에러가 표시됨', async () => {
      render(<FileUpload accept=".pdf" />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const txtFile = createMockFile('test.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [txtFile] } });

      await waitFor(() => {
        expect(screen.getByText('File type not supported')).toBeInTheDocument();
      });
    });

    it('허용된 파일 타입이면 정상 처리됨', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload accept=".txt,text/plain" onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const txtFile = createMockFile('test.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [txtFile] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        expect(screen.queryByText('File type not supported')).not.toBeInTheDocument();
      });
    });

    it('MIME type 와일드카드가 동작함', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload accept="image/*" onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const imageFile = createMockFile('test.png', 1024, 'image/png');

      fireEvent.change(input, { target: { files: [imageFile] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
      });
    });
  });

  describe('커스텀 validator', () => {
    it('커스텀 validator가 에러 반환시 표시됨', async () => {
      const validator = (file: File) => {
        if (file.name.includes('invalid')) {
          return 'Invalid file name';
        }
        return null;
      };

      render(<FileUpload validator={validator} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const invalidFile = createMockFile('invalid.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [invalidFile] } });

      await waitFor(() => {
        expect(screen.getByText('Invalid file name')).toBeInTheDocument();
      });
    });
  });

  describe('파일 제거', () => {
    it('파일 제거 버튼 클릭시 파일이 제거됨', async () => {
      const user = userEvent.setup();
      const handleFileRemove = vi.fn();
      render(<FileUpload onFileRemove={handleFileRemove} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByText('test.txt')).toBeInTheDocument();
      });

      const removeButton = screen.getByRole('button', { name: 'Remove test.txt' });
      await user.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
      });
    });

    it('파일 제거시 onFileRemove가 호출됨', async () => {
      const user = userEvent.setup();
      const handleFileRemove = vi.fn();
      render(<FileUpload onFileRemove={handleFileRemove} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByText('test.txt')).toBeInTheDocument();
      });

      const removeButton = screen.getByRole('button', { name: 'Remove test.txt' });
      await user.click(removeButton);

      await waitFor(() => {
        expect(handleFileRemove).toHaveBeenCalled();
      });
    });
  });

  describe('파일 리스트 표시', () => {
    it('선택된 파일이 리스트에 표시됨', async () => {
      render(<FileUpload />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('document.pdf', 2048, 'application/pdf');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByText('document.pdf')).toBeInTheDocument();
      });
    });

    it('파일 크기가 표시됨', async () => {
      render(<FileUpload />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByText('1 KB')).toBeInTheDocument();
      });
    });
  });

  describe('maxFiles', () => {
    it('maxFiles 제한이 적용됨', async () => {
      // Mock alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      render(<FileUpload multiple maxFiles={2} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const files = [
        createMockFile('file1.txt', 1024, 'text/plain'),
        createMockFile('file2.txt', 1024, 'text/plain'),
        createMockFile('file3.txt', 1024, 'text/plain'),
      ];

      const fileList = {
        0: files[0],
        1: files[1],
        2: files[2],
        length: 3,
        item: (i: number) => files[i],
        [Symbol.iterator]: function* () {
          for (const f of files) yield f;
        },
      } as unknown as FileList;

      fireEvent.change(input, { target: { files: fileList } });

      expect(alertSpy).toHaveBeenCalledWith('Maximum 2 files allowed');
      alertSpy.mockRestore();
    });
  });

  describe('Drag and Drop', () => {
    it('드래그 진입시 스타일이 변경됨', () => {
      render(<FileUpload />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });

      fireEvent.dragEnter(uploadArea, {
        dataTransfer: createDataTransfer([]),
      });

      expect(document.querySelector('[class*="dragging"]')).toBeInTheDocument();
    });

    it('드래그 떠날시 스타일이 원래대로 됨', () => {
      render(<FileUpload />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });

      fireEvent.dragEnter(uploadArea, {
        dataTransfer: createDataTransfer([]),
      });

      fireEvent.dragLeave(uploadArea, {
        dataTransfer: createDataTransfer([]),
      });

      expect(document.querySelector('[class*="dragging"]')).not.toBeInTheDocument();
    });

    it('파일 드롭시 처리됨', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload onFilesChange={handleFilesChange} />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });
      const file = createMockFile('dropped.txt', 1024, 'text/plain');

      fireEvent.drop(uploadArea, {
        dataTransfer: createDataTransfer([file]),
      });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
      });
    });

    it('disabled일 때 드롭이 무시됨', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload disabled onFilesChange={handleFilesChange} />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });
      const file = createMockFile('dropped.txt', 1024, 'text/plain');

      fireEvent.drop(uploadArea, {
        dataTransfer: createDataTransfer([file]),
      });

      expect(handleFilesChange).not.toHaveBeenCalled();
    });
  });

  describe('키보드 접근성', () => {
    it('Enter로 파일 선택 대화상자가 열림', async () => {
      const user = userEvent.setup();
      render(<FileUpload />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });
      uploadArea.focus();

      // We can't actually test file dialog opening, but we can verify the handler exists
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      await user.keyboard('{Enter}');

      expect(clickSpy).toHaveBeenCalled();
    });

    it('Space로 파일 선택 대화상자가 열림', async () => {
      const user = userEvent.setup();
      render(<FileUpload />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });
      uploadArea.focus();

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      await user.keyboard(' ');

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('접근성', () => {
    it('upload area에 role="button"이 있음', () => {
      render(<FileUpload />);

      expect(screen.getByRole('button', { name: 'File upload area' })).toBeInTheDocument();
    });

    it('upload area에 aria-label이 있음', () => {
      render(<FileUpload />);

      const uploadArea = screen.getByRole('button', { name: 'File upload area' });
      expect(uploadArea).toHaveAttribute('aria-label', 'File upload area');
    });

    it('remove 버튼에 aria-label이 있음', async () => {
      render(<FileUpload />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        const removeButton = screen.getByRole('button', { name: 'Remove test.txt' });
        expect(removeButton).toHaveAttribute('aria-label', 'Remove test.txt');
      });
    });

    it('FileUpload가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<FileUpload label="Upload" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('native input mode가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<FileUpload useNativeInput label="Upload" />);

      const results = await axe(container, {
        rules: { label: { enabled: false } },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('이미지 업로더', async () => {
      const handleFilesChange = vi.fn();

      render(
        <FileUpload
          label="Profile Image"
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          showPreview
          onFilesChange={handleFilesChange}
          hintText="PNG, JPG up to 5MB"
        />
      );

      expect(screen.getByText('Profile Image')).toBeInTheDocument();
      expect(screen.getByText('PNG, JPG up to 5MB')).toBeInTheDocument();

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('accept', 'image/*');
    });

    it('문서 업로더', async () => {
      render(
        <FileUpload
          label="Documents"
          accept=".pdf,.doc,.docx"
          multiple
          maxFiles={5}
          helperText="Upload up to 5 documents"
        />
      );

      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Upload up to 5 documents')).toBeInTheDocument();
    });

    it('여러 파일 업로드 후 제거', async () => {
      const user = userEvent.setup();
      render(<FileUpload multiple maxFiles={5} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = createMockFile('file1.txt', 1024, 'text/plain');
      const file2 = createMockFile('file2.txt', 1024, 'text/plain');

      fireEvent.change(input, { target: { files: [file1] } });

      await waitFor(() => {
        expect(screen.getByText('file1.txt')).toBeInTheDocument();
      });

      // Add second file (simulating another selection)
      fireEvent.change(input, { target: { files: [file2] } });

      await waitFor(() => {
        expect(screen.getByText('file2.txt')).toBeInTheDocument();
      });

      // Remove first file
      const removeButton = screen.getByRole('button', { name: 'Remove file1.txt' });
      await user.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText('file1.txt')).not.toBeInTheDocument();
        expect(screen.getByText('file2.txt')).toBeInTheDocument();
      });
    });
  });
});
