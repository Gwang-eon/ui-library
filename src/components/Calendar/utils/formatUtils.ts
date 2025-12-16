/**
 * 날짜 포맷 유틸리티
 */

import type { TimeValue } from '../types';

/** 날짜를 문자열로 포맷 */
export const formatDate = (date: Date, format: string = 'yyyy.MM.dd'): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const tokens: Record<string, string> = {
    yyyy: String(year),
    yy: String(year).slice(-2),
    MM: String(month).padStart(2, '0'),
    M: String(month),
    dd: String(day).padStart(2, '0'),
    d: String(day),
    HH: String(hours).padStart(2, '0'),
    H: String(hours),
    hh: String(hours % 12 || 12).padStart(2, '0'),
    h: String(hours % 12 || 12),
    mm: String(minutes).padStart(2, '0'),
    m: String(minutes),
    ss: String(seconds).padStart(2, '0'),
    s: String(seconds),
    a: hours < 12 ? 'AM' : 'PM',
  };

  let result = format;
  // 긴 토큰부터 처리 (yyyy before yy)
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);
  for (const token of sortedTokens) {
    result = result.replace(new RegExp(token, 'g'), tokens[token]);
  }

  return result;
};

/** 시간을 문자열로 포맷 */
export const formatTime = (time: TimeValue, format: string = 'HH:mm', use24Hour: boolean = true): string => {
  const { hours, minutes, seconds = 0 } = time;

  const tokens: Record<string, string> = {
    HH: String(hours).padStart(2, '0'),
    H: String(hours),
    hh: String(hours % 12 || 12).padStart(2, '0'),
    h: String(hours % 12 || 12),
    mm: String(minutes).padStart(2, '0'),
    m: String(minutes),
    ss: String(seconds).padStart(2, '0'),
    s: String(seconds),
    a: hours < 12 ? 'AM' : 'PM',
    A: hours < 12 ? '오전' : '오후',
  };

  let result = format;
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);
  for (const token of sortedTokens) {
    result = result.replace(new RegExp(token, 'g'), tokens[token]);
  }

  return result;
};

/** 문자열을 Date로 파싱 (간단한 구현) */
export const parseDate = (dateString: string, format: string = 'yyyy.MM.dd'): Date | null => {
  if (!dateString) return null;

  try {
    // 포맷에서 토큰 위치 추출
    const tokenRegex = /yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s/g;
    const tokens: { token: string; index: number }[] = [];
    let match;

    while ((match = tokenRegex.exec(format)) !== null) {
      tokens.push({ token: match[0], index: match.index });
    }

    // 숫자만 추출
    const numbers = dateString.match(/\d+/g);
    if (!numbers || numbers.length < tokens.length) return null;

    let year = new Date().getFullYear();
    let month = 0;
    let day = 1;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    tokens.forEach((t, i) => {
      const value = parseInt(numbers[i], 10);
      switch (t.token) {
        case 'yyyy':
          year = value;
          break;
        case 'yy':
          year = value < 50 ? 2000 + value : 1900 + value;
          break;
        case 'MM':
        case 'M':
          month = value - 1;
          break;
        case 'dd':
        case 'd':
          day = value;
          break;
        case 'HH':
        case 'H':
          hours = value;
          break;
        case 'mm':
        case 'm':
          minutes = value;
          break;
        case 'ss':
        case 's':
          seconds = value;
          break;
      }
    });

    const result = new Date(year, month, day, hours, minutes, seconds);
    // 유효한 날짜인지 확인
    if (isNaN(result.getTime())) return null;
    return result;
  } catch {
    return null;
  }
};

/** 상대적 날짜 표시 (오늘, 어제, n일 전 등) */
export const formatRelativeDate = (date: Date, locale: 'ko' | 'en' = 'ko'): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (locale === 'ko') {
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  }

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

/** 분기 포맷 */
export const formatQuarter = (date: Date, locale: 'ko' | 'en' = 'ko'): string => {
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  const year = date.getFullYear();

  if (locale === 'ko') {
    return `${year}년 ${quarter}분기`;
  }
  return `Q${quarter} ${year}`;
};

/** 주 포맷 */
export const formatWeek = (date: Date, locale: 'ko' | 'en' = 'ko'): string => {
  const weekNum = getISOWeek(date);
  const year = date.getFullYear();

  if (locale === 'ko') {
    return `${year}년 ${weekNum}주차`;
  }
  return `Week ${weekNum}, ${year}`;
};

/** ISO 주 번호 */
const getISOWeek = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};
