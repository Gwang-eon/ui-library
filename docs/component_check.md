● 성능 점검 결과

  1. memo 사용 현황 ❌ 심각

  | 항목      | 현황                        |
  |---------|---------------------------|
  | 전체 컴포넌트 | 94개                       |
  | memo 사용 | 2개 (Toast, DeviceCard 일부) |
  | 미사용     | 92개 (98%)                 |

  2. 인라인 함수/객체 ⚠️ 주의

  | 항목                            | 발생 횟수         |
  |-------------------------------|---------------|
  | 인라인 핸들러 (onClick={() => ...}) | 99회 (31개 파일)  |
  | 인라인 스타일 (style={{ }})         | 106회 (28개 파일) |

  문제 컴포넌트:
  - ColorPicker: 인라인 핸들러 18개, 인라인 스타일 6개
  - iot/DeviceList: 인라인 스타일 21개
  - iot/SensorPanel: 인라인 스타일 17개
  - iot/EventDataTable: 인라인 핸들러 9개

  3. useCallback/useMemo 사용 ⚠️ 부분적

  - 21개 파일에서 99회 사용 (일부만 적용)
  - Select: useMemo 1회만 사용, 핸들러들은 메모이제이션 없음
  - Table: useCallback/useMemo 전혀 없음

  4. 리스트 key 문제 ❌ 심각

  - 45개 위치에서 key={index} 사용
  - 주요 문제 파일:
    - Table.tsx: row에 index 사용
    - Steps.tsx, Rating.tsx, Carousel.tsx
    - IoT 컴포넌트들 전반

  5. 우선 개선 대상 (High Priority)

  | 순위  | 컴포넌트        | 문제                                 |
  |-----|-------------|------------------------------------|
  | 1   | Table       | memo 없음, key=index, useCallback 없음 |
  | 2   | Select      | 핸들러 메모이제이션 없음, 매 렌더 함수 재생성         |
  | 3   | ColorPicker | 인라인 24개 (핸들러 18 + 스타일 6)           |
  | 4   | IoT 컴포넌트들   | 인라인 스타일 다수, memo 없음                |
  | 5   | Pagination  | 인라인 핸들러 7개                         |