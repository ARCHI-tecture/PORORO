# PORORO

## 1. 프로젝트 설명

취업 준비를 위해 시간표를 쉽게 관리하고 일정 관리까지 도와주는 웹사이트가 필요하다고 느꼈다. 따라서 뽀모도로 타이머와 Todo list를 결합한 사이트를 만들어 실제로 이용해보고자 하여 만들게 되었다.

## 2. 주요 기능

### [홈]

- 각 페이지 별 이동
- 캘린더 조회
- 카테고리 및 루틴 조회
- 투두리스트 추가
- 투두리스트 수정/삭제
- 투두리스트 완료 체크
- 날짜별 투두리스트 조회
- 날짜별 투두리스트 갯수 출력

### [카테고리]

- 카테고리 색상 추가
- 카테고리 색상 수정/삭제

### [루틴]

- 카테고리별 루틴 출력
- 루틴 (제목, 기간, 주기) 생성
- 루틴 제목 수정 및 삭제

### [뽀모도로 타이머]

- 25분 - 5분 주기 타이머 작동
- 타이머 일시정지, 정지, 작업 전환 기능
- 타이머 배경화면 커스텀
- 완료 시 타이머 기록 저장

### [통계 기록]

- 뽀모도로 타이머 기록 타임테이블 출력
- 기록 평균시간, 하루 총 시간, 총 시간 출력

## 3. 개발 환경

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Mui](https://img.shields.io/badge/Mui-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white)

## 4. 팀원 소개

|                                  🐰**이가영**                                  |                            🐣**노효민**                             |                            🐼**손예림**                             |                                  🐹**조다솜**                                  |
| :----------------------------------------------------------------------------: | :-----------------------------------------------------------------: | :-----------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| <img src="https://i.ibb.co/7yBsKX8/porfolio-profile.jpg" height=220 width=180> | <img src="https://i.ibb.co/Hd9Pz5B/image.jpg" height=220 width=180> | <img src="https://i.ibb.co/DpmsYD3/image.png" height=220 width=180> | <img src="https://i.ibb.co/L0wswBF/removebg-preview.png" height=220 width=180> |
|                          팀장, FE<br>뽀모도로 타이머                           |                         FE<br>메인 홈페이지                         |                      FE<br>카테고리, 통계 기록                      |                               FE<br>루틴 페이지                                |

## 6. 구조

```
src
 ┣ components
 ┃ ┗ layout
 ┣ pages
 ┃ ┣ category
 ┃ ┃ ┣ categoryHeader
 ┃ ┃ ┣ categoryList
 ┃ ┃ ┗ type.ts
 ┃ ┣ home
 ┃ ┃ ┣ button
 ┃ ┃ ┣ calendar
 ┃ ┃ ┣ feed
 ┃ ┃ ┗ types.ts
 ┃ ┣ record
 ┃ ┣ routine
 ┃ ┃ ┣ RoutineCategory
 ┃ ┃ ┣ RoutineList
 ┃ ┃ ┗ RoutineType.ts
 ┃ ┗ timer
 ┣ styles
 ┃ ┗ tailwind.css
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┣ index.tsx
 ┗ setupTests.ts
```

## 7. 트러블 슈팅

### [이가영]

#### - 원인

타이머 배경화면 설정 페이지에서 설정을 변경하고 적용 버튼을 눌렀을 때 실제 타이머 페이지에는 적용되지 않는 현상이 발생했습니다. 원인은 배경 선택지를 관리하는 기존의 state에 있었습니다. 현재 옵션을 저장하는 `selectedImage`와 기존 옵션을 저장하는 `currentWallpaper`가 localStorage에 직접 접근해 하나의 값(`wallpaper`)에 중복으로 상태값을 설정하고 있어 state가 제대로 동기화 되지 않았고, 배경 설정을 적용하는 코드가 className이 포함된 객체를 return하면서 style 속성이 적용되지 않아 문제가 생긴 것으로 파악했습니다.

#### - 해결

배경화면 설정을 위해 `selectedImage`, `preview`, `currentWallpaper`로 나뉘어져 있던 state를 배경 옵션을 저장하는 `bgOption`, 옵션의 실제 값을 저장하는 `bgValue`, 그리고 이미지 파일을 개별적으로 관리하는 `imageFile`로 변경했습니다.
이에 따라 localStorage에 저장되는 값 또한 하나가 아닌 `bgOption`과 `bgValue`로 나누어 `bgOption`이 `imageFile`인 경우에만 이미지 파일을 `bgValue`에 저장하고, 그 외의 선택지를 선택했을 경우에는 해당 옵션값에 해당하는 배경색을 출력하도록 함수를 개선했습니다.
다만 현재 `bgValue`의 색상값은 프로젝트 공통 색상 코드를 관리하는 `Theme` 속성에 포함되어 있지 않아 사용자가 옵션을 선택할 때마다 직접적으로 색상값을 변경하고 있습니다. 배경 색상값 또한 따로 분리시켜 관리한다면 차후 유지보수가 용이할 수 있을 것입니다.

```tsx
const handleSave = () => {
  localStorage.setItem("bgOption", bgOption);
  if (bgOption === "image" && imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      localStorage.setItem("bgValue", result);
      alert("설정 완료!");
    };
    reader.readAsDataURL(imageFile);
  } else {
    localStorage.setItem("bgValue", bgValue);
    alert("설정 완료!");
  }
};
```

### [노효민]

#### - 원인

여러 카테고리에 동시에 동일한 todolist가 추가, 삭제, 수정 되는 문제가 발생하였으며 이는 todolist id가 category id를 확인하는 과정에서 문제가 발생하여 이런 문제가 생겼다고 생각합니다.

#### - 해결

useTodoLostStore함수를 이용하여 addTodo를 매칭 해주는 방법으로 변경하니 오류가 해결되었습니다.

[손예림]

#### - 원인

카테고리 색상을 추가할 때 사용하는 CirclePicker 컴포넌트가 브라우저 사이즈 변경 시 색상 선택 버튼 밑에 붙어서 자연스럽게 이동하지 않고, 브라우저 사이징이 완료된 후 약 3초 후에 이동하는 현상이 발생했습니다. 브라우저 크기 변경 시 컴포넌트의 위치가 실시간으로 업데이트되지 않아 발생한 문제로 판단되었습니다. CSS의 position: absolute나 position: fixed 속성 등을 사용하여 위치를 조정하려 했으나, 이는 문제를 해결하지 못했습니다.

#### - 해결

버퍼링 현상 없이 자연스럽게 이동시키는 것이 어려웠기 때문에, 화면 사이즈가 조정되면 아예 창을 닫는 방법을 선택했습니다. 이를 위해 useEffect 훅을 사용하여 window 객체에 resize 이벤트를 추가하고, 브라우저 사이즈가 변경될 때 CirclePicker 창이 꺼지도록 구현했습니다.

```tsx
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
useEffect(() => {
  window.addEventListener("resize", () => {
    setAnchorEl(null);
  });
}, []);
```

### [조다솜]

#### - 원인

데이터 모델에는 루틴의 카테고리를 나타내는 속성이 없어 루틴을 카테고리별로 구분할 수 없었습니다.
루틴 데이터는 단순히 이름, 기간, 주기만을 포함하고 있었습니다.

#### - 해결

• 고유 ID 부여:
각 카테고리에 고유한 ID를 부여하고, 루틴 데이터에 이 ID를 추가하여 카테고리와 연결시켰습니다.
이렇게 함으로써 같은 카테고리의 루틴은 동일한 ID를 가지도록 했습니다.</br>
• 데이터 구조 변경:
루틴 객체에 'Id' 속성을 추가하여 루틴과 카테고리를 명시적으로 연결했습니다.
필터링 구현:
카테고리별 루틴을 출력하기 위해 filter 메소드를 사용하여 Id가 동일한 루틴을 추출했습니다.
결과 확인:
각 카테고리별로 필터링된 루틴을 화면에 출력하여 문제를 해결했습니다.
UI에서는 선택된 카테고리에 따라 적절히 루틴이 표시되도록 구현했습니다.

## 8. 개발 후기

| 🐰**이가영**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이번 프로젝트를 진행하면서 다시 한 번 React에 관한 지식을 점검하는 동시에 TypeScript나 Tailwind와 같은 실용적인 기술들을 바로 프로젝트에 적용해 보며 배울 수 있어서 기뻤습니다. 그리고 팀장이 되어 프로젝트를 이끌면서 Jira를 사용해 진행 상황을 공유하고, PR을 할 때는 모두 모여 검토하는 등 팀원들이 적극적으로 참여하고 협력해 주어 최초에 예상했던 기간 내에 기획했던 기능들을 전부 구현할 수 있었습니다. 다만 현재 코드를 보면 컴포넌트를 조금 더 나누거나 리팩토링 할 요소들이 보여 다음에는 조금 더 컴포넌트 설계에 주의를 기울여 개발을 진행하려 합니다.                                                                                                                                                                                                         |
| 🐣**노효민**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 처음 사용해보는 typescript의 미숙함으로 시작이 어려웠으나 방향을 잡은 뒤로는 잘 풀어 나갔습니다. 하지만 적응하는데 많은 시간이 걸려 다른 팀원들 보다 뒤쳐지게 되었고 디테일한 오류를 해결하는데 팀원들의 많은 도움이 필요하였습니다. 또한 tailwindCSS 사용에 어려움을 겪어 사용하지 못한 점에서 많은 아쉬움이 남는 프로젝트입니다. 다음 프로젝트를 시작할 때 typescript처럼 사전 공부가 필요해 보이며 꼭 다시 사용해보고 싶습니다. 전체적으로 프로젝트를 진행하며 팀원들에게 많은 도움을 받았으며 이 경험을 잊지않고 다음 프로젝트를 진행할 때에는 맡은 바는 혼자 진행할 수 있도록 노력하겠습니다.                                                                                                                                                                       |
| 🐼**손예림**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 타입스크립트롤 처음 배우고 기능별로 컴포넌트를 나눠, 조금 더 가독성 좋고 엄격한 코드 작성에 다가간 것 같아 좋았습니다. 타이머나 투두리스트가 프론트엔드 개발자라면 대부분 처음에 해보는 프로젝트인 것 같은데 생각보다 신경써야 할 것들이 많아서 성장할 수 있었던 것 같습니다. 후에도 유지보수 하기 좋은 코드를 작성하고 놓칠 만한 부분도 신경써서 업데이트 하고 싶습니다.                                                                                                                                                                                                                                                                                                                                                                                                |
| 🐹**조다솜**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 두 번째 프로젝트를 진행하면서, 첫 번째 프로젝트에서 얻은 경험을 바탕으로 많은 부분에서 자신감을 갖고 접근할 수 있었습니다. 첫 번째 프로젝트를 통해 배운 것들을 적용하며 프로젝트를 계획하고 실행했지만, 새로운 도전 과제도 많았습니다. 특히, 처음 사용하는 TypeScript와 Tailwind는 저와 팀원들에게 큰 도전이었습니다. 게다가 자발적으로 모인 팀원들로 구성된 팀이라 시간적, 공간적 자율성이 커서 오히려 프로젝트가 늘어지지 않을까 하는 걱정도 있었습니다. 하지만 이런 걱정은 팀원 간의 단합과 협력을 통해 극복할 수 있었습니다. 팀원들 모두 새로운 언어와 도구를 학습하는 데 적극적이었고, 에러 사항이 발생했을 때는 모두가 모여서 상의하고 해결책을 찾았습니다. 열정적인 팀원들 덕분에 계획된 내용을 모두 구현해낼 수 있었습니다. 팀원들에게 감사인사 전하고 싶습니다. |
