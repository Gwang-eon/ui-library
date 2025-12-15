/**
 * Avatar 컴포넌트 테스트
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링', () => {
    it('이미지가 렌더링됨', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);

      const img = screen.getByRole('img', { name: 'User' });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('alt 기본값은 Avatar', () => {
      render(<Avatar src="https://example.com/avatar.jpg" />);

      expect(screen.getByRole('img', { name: 'Avatar' })).toBeInTheDocument();
    });

    it('initials가 렌더링됨', () => {
      render(<Avatar initials="JD" />);

      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('icon이 렌더링됨', () => {
      render(<Avatar icon={<span data-testid="user-icon">👤</span>} />);

      expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    });

    it('src가 우선순위가 가장 높음', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          initials="JD"
          icon={<span data-testid="icon">👤</span>}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('src 없으면 icon이 우선', () => {
      render(
        <Avatar initials="JD" icon={<span data-testid="icon">👤</span>} />
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
    });

    it('className이 적용됨', () => {
      const { container } = render(<Avatar initials="JD" className="custom-avatar" />);

      expect(container.querySelector('.custom-avatar')).toBeInTheDocument();
    });
  });

  describe('size', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`${size} size가 적용됨`, () => {
        render(<Avatar initials="JD" size={size} />);

        const sizeClass = size === '2xl' ? 'avatar2xl' : `avatar${size.charAt(0).toUpperCase()}${size.slice(1)}`;
        expect(document.querySelector(`[class*="${sizeClass}"]`)).toBeInTheDocument();
      });
    });

    it('기본 size는 md', () => {
      render(<Avatar initials="JD" />);

      expect(document.querySelector('[class*="avatarMd"]')).toBeInTheDocument();
    });
  });

  describe('shape', () => {
    const shapes = ['circle', 'rounded', 'square'] as const;

    shapes.forEach((shape) => {
      it(`${shape} shape가 적용됨`, () => {
        render(<Avatar initials="JD" shape={shape} />);

        const capitalizedShape = shape.charAt(0).toUpperCase() + shape.slice(1);
        expect(document.querySelector(`[class*="avatar${capitalizedShape}"]`)).toBeInTheDocument();
      });
    });

    it('기본 shape는 circle', () => {
      render(<Avatar initials="JD" />);

      expect(document.querySelector('[class*="avatarCircle"]')).toBeInTheDocument();
    });
  });

  describe('color', () => {
    const colors = ['primary', 'success', 'warning', 'error', 'grey'] as const;

    colors.forEach((color) => {
      it(`${color} color가 적용됨 (src 없을 때)`, () => {
        render(<Avatar initials="JD" color={color} />);

        const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1);
        expect(document.querySelector(`[class*="avatar${capitalizedColor}"]`)).toBeInTheDocument();
      });
    });

    it('src가 있으면 color 클래스가 적용되지 않음', () => {
      render(<Avatar src="https://example.com/avatar.jpg" color="success" />);

      expect(document.querySelector('[class*="avatarSuccess"]')).not.toBeInTheDocument();
    });

    it('기본 color는 primary', () => {
      render(<Avatar initials="JD" />);

      expect(document.querySelector('[class*="avatarPrimary"]')).toBeInTheDocument();
    });
  });

  describe('status', () => {
    it('status가 없으면 badge가 렌더링되지 않음', () => {
      render(<Avatar initials="JD" />);

      expect(document.querySelector('[class*="avatarBadge"]')).not.toBeInTheDocument();
    });

    it('online status badge가 렌더링됨', () => {
      render(<Avatar initials="JD" status="online" />);

      expect(document.querySelector('[class*="avatarBadge"]')).toBeInTheDocument();
    });

    it('offline status badge가 렌더링됨', () => {
      render(<Avatar initials="JD" status="offline" />);

      expect(document.querySelector('[class*="avatarBadgeOffline"]')).toBeInTheDocument();
    });

    it('busy status badge가 렌더링됨', () => {
      render(<Avatar initials="JD" status="busy" />);

      expect(document.querySelector('[class*="avatarBadgeBusy"]')).toBeInTheDocument();
    });

    it('away status badge가 렌더링됨', () => {
      render(<Avatar initials="JD" status="away" />);

      expect(document.querySelector('[class*="avatarBadgeAway"]')).toBeInTheDocument();
    });
  });

  describe('Avatar.Group', () => {
    it('Avatar.Group이 렌더링됨', () => {
      render(
        <Avatar.Group>
          <Avatar initials="A" />
          <Avatar initials="B" />
          <Avatar initials="C" />
        </Avatar.Group>
      );

      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('Avatar.Group className이 적용됨', () => {
      render(
        <Avatar.Group className="custom-group">
          <Avatar initials="A" />
        </Avatar.Group>
      );

      expect(document.querySelector('.custom-group')).toBeInTheDocument();
    });

    it('Avatar.Group에 avatarGroup 클래스가 있음', () => {
      render(
        <Avatar.Group>
          <Avatar initials="A" />
        </Avatar.Group>
      );

      expect(document.querySelector('[class*="avatarGroup"]')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('이미지 Avatar가 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Avatar src="https://example.com/avatar.jpg" alt="John Doe" />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('initials Avatar가 a11y 위반 사항이 없음', async () => {
      const { container } = render(<Avatar initials="JD" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Avatar.Group이 a11y 위반 사항이 없음', async () => {
      const { container } = render(
        <Avatar.Group>
          <Avatar initials="A" />
          <Avatar initials="B" />
          <Avatar initials="C" />
        </Avatar.Group>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('복합 사용', () => {
    it('사용자 프로필 avatar', () => {
      render(
        <Avatar
          src="https://example.com/user.jpg"
          alt="Jane Doe"
          size="lg"
          shape="circle"
          status="online"
        />
      );

      expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
      expect(document.querySelector('[class*="avatarLg"]')).toBeInTheDocument();
      expect(document.querySelector('[class*="avatarCircle"]')).toBeInTheDocument();
      expect(document.querySelector('[class*="avatarBadge"]')).toBeInTheDocument();
    });

    it('팀 멤버 그룹 avatar', () => {
      render(
        <Avatar.Group>
          <Avatar src="https://example.com/1.jpg" alt="User 1" />
          <Avatar src="https://example.com/2.jpg" alt="User 2" />
          <Avatar initials="+3" color="grey" />
        </Avatar.Group>
      );

      expect(screen.getByRole('img', { name: 'User 1' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'User 2' })).toBeInTheDocument();
      expect(screen.getByText('+3')).toBeInTheDocument();
    });

    it('다양한 크기의 avatar', () => {
      render(
        <div>
          <Avatar initials="XS" size="xs" />
          <Avatar initials="SM" size="sm" />
          <Avatar initials="MD" size="md" />
          <Avatar initials="LG" size="lg" />
          <Avatar initials="XL" size="xl" />
          <Avatar initials="2X" size="2xl" />
        </div>
      );

      expect(screen.getByText('XS')).toBeInTheDocument();
      expect(screen.getByText('SM')).toBeInTheDocument();
      expect(screen.getByText('MD')).toBeInTheDocument();
      expect(screen.getByText('LG')).toBeInTheDocument();
      expect(screen.getByText('XL')).toBeInTheDocument();
      expect(screen.getByText('2X')).toBeInTheDocument();
    });

    it('상태별 avatar', () => {
      render(
        <div>
          <Avatar initials="ON" status="online" />
          <Avatar initials="OF" status="offline" />
          <Avatar initials="BU" status="busy" />
          <Avatar initials="AW" status="away" />
        </div>
      );

      expect(screen.getByText('ON')).toBeInTheDocument();
      expect(screen.getByText('OF')).toBeInTheDocument();
      expect(screen.getByText('BU')).toBeInTheDocument();
      expect(screen.getByText('AW')).toBeInTheDocument();
    });
  });
});
