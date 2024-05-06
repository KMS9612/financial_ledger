# 나만의 가계부

# 개요

---

개인용 가계부 웹사이트입니다. 본인의 아이디를 이용해 등록정보를 DB에 저장하여 소비,수입 정보를 한눈에 볼 수 있게 해줍니다.
Next14 / Tailwind / Axios / RestAPI / Express / MongoDB를 사용해서 제작한 포트폴리오 사이트입니다.

# 경로

https://financial-ledger-ten.vercel.app/
(테스트 ID를 이용해 주세요.)

# 사용 스택

1. Front-End

- Next.js 14
- TypeScript
- TailWind
- Chart.js
- Recoil

---

2. Back-End

- Express
- TypeScript
- Node.js (NodeMon)
- MongoDB / Mongoose

# 개발 기간

23.12.01 ~ Keep Developing
(디자인, 성능, 코드방식 등 개선해야할 점이 많기 때문에 계속해서 유지보수 할 예정입니다.)

# 페이지 소개

## 메인페이지

### 설명

평소 개발할때 랜딩페이지에는 크게 관심을 두지 않았기 때문에 이번엔 ScrollEvent를 사용하여 보다 동적인 페이지를 만들고자 노력했습니다.
UI/UX 부분에서 많은 개선이 필요하다고 판단되어 신중하게 Figma를 이용해 UI/UX를 개선해 나갈 예정입니다.

### 페이지 사진

![ggb-main](https://github.com/KMS9612/financial_ledger/assets/103579314/d2a7fd30-8410-4d4d-bcf9-b09fa9fa7c45)
">

---

## 설정 및 등록페이지(EditPage)

### 설명

N차원으로 저장되는 일일 지출/수입 데이터를 등록,관리,시각화 하는데 중점을 둿습니다. 하지만 복잡한 N차원 데이터를 직접 구상,저장,관리하는 과정에서 성능,코드의 가시성 면에서 놓치는 부분이 많다고 생각해 우선적으로 개선 할 생각입니다.
N차원 데이터를 다루며 예상했던 UI의 방향성과 다른 부분과 Type을 지정하고 지정된 타입을 어떤식으로 보관해야 하는지에 대한 방법이 매우 곤란했으며 이를 해결하기 위해 Figma에서 우선적으로 UI를 수정하며 진행했습니다.
Type지정 및 보관은 아직 해결해야 할 과제로 남아있습니다.

### 페이지 사진

![ggb-edit](https://github.com/KMS9612/financial_ledger/assets/103579314/8cac3c33-6a88-437c-a1e5-adcfc2aef799)
![ggb-edit-detail](https://github.com/KMS9612/financial_ledger/assets/103579314/b67400cf-593d-44b2-8606-3084c1ff0e64)

---

## 대쉬보드 페이지(ResultPage)

### 설명

데이터 시각화에 집중한 페이지입니다. 원시형태인 숫자로 보여주는 부분과 시각적으로 쉽게 볼 수 있는 그래프를 이용했습니다.
Chart.js를 사용했으며 Docs에서 제공하는 설명이 vanilaJS에 초점이 맞추어져있어 Next에 적용하는데 문제가 있엇지만 검색을 통해 react-chartjs-2라는 라이브러리를 알게되어 성공적으로 해결하게 되었습니다.
앞으로는 연도별, 월별 데이터를 선택해 그래프로 바로 적용할 수 있는 기능을 제작하려고 합니다.

### 페이지 사진

![ggb-result](https://github.com/KMS9612/financial_ledger/assets/103579314/48690934-09f3-45a1-ac58-fd1aabf2224a)

---
