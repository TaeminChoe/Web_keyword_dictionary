## 라우팅과 axios, json-server를 활용한 web 용어 사전

-   단어장처럼 Web용어를 추가하고 삭제할 수 있는 app
-   가짜 server로 json-server 활용

## JSON-server 설치

JSON-server도 함께 실행해야 정상 동작합니다.

```
npm install -g json-server

json-server --watch [filename].json --port [port number]
```

### 전체 구조

```jsx
─src
  └─components
    └─ Header.js
  └─db
    └─ data.json
  └─router
    └─ Home.js
    └─ Keyword.js
    └─ AddKeyword.js
  App.js
  hooks.js
```

### data.json

![image](https://user-images.githubusercontent.com/92558961/148352925-259aa833-cc34-434a-b06e-ab09e57fdc26.png)

-   가상 서버에서 가져오는 데이터 형태
-   id는 서버로 생성 요청을 할 때 자동으로 임의의 문자열을 부여

### app.js

![image](https://user-images.githubusercontent.com/92558961/148352983-145e8823-76d6-4033-8fc3-496a891682fd.png)

\*\*\* react가 버전업 되면서 Switch컴포넌트의 이름이 Routes로 변경되었습니다.

-   12: Route 컴포넌트 위로 Header컴포넌트 생성
-   14: root 경로. 기록된 keyword를 전체적으로 확인 가능한 페이지
-   15: keyword에 대한 자세한 내용을 볼 수 있는 페이지
    -   keyword/ 이후 기록되는 값은 id이름으로 useParam함수를 활용하여 사용 가능
-   16: keyword를 추가 생성할 수 있는 페이지
-   17: 위에 정의된 url외에 다른 url이 입력될 경우 보여지는 페이지

### Hooks.js

![image](https://user-images.githubusercontent.com/92558961/148353010-a3bfde8e-f772-40d6-b3a8-abceb059897c.png)

-   3: getData(url) : url서버에 데이터를 요청하여 반환하는 함수
-   8: removeData(url, id) : url서버에 id에 해당하는 데이터 삭제 요청 함수

### Header.js

![image](https://user-images.githubusercontent.com/92558961/148353020-747c10e9-1d66-416b-9b5f-dc31e96ed0ed.png)

-   router로 페이지가 전환되어도 영향없이 상단에 보여짐

출력 결과

![image](https://user-images.githubusercontent.com/92558961/148353250-82cead28-cebc-44af-a3cd-83bcc6f41e1c.png)

### Home.js

![image](https://user-images.githubusercontent.com/92558961/148353267-9f5b1642-a5ee-40cc-a6b0-975af1f29dad.png)

-   7: loading : 서버에 데이터를 받아오는 상태를 표현하기 위함
-   8: data : 서버에 요청한 데이터를 저장할 state
-   10: remove : hooks.js를 통해 서버에 id에 해당하는 데이터 삭제 요청
    -   event는 event함수의 기본 매개변수로, 함수를 호출한 element의 정보를 얻을 수 있음
-   15: 데이터가 변동 되거나 초기에 로딩 할 때 데이터를 조회하는 함수
-   19: useEffect() : 앱 초기 실행 시 데이터를 요청하기 위함
-   23: useEffect() : 서버에서 전달 받은 데이터가 유효할 때 본 컨텐츠를 보여주기 위함

![image](https://user-images.githubusercontent.com/92558961/148353287-13834ac2-93d6-40b1-9275-d04b0e01c905.png)

32: Link : keyword를 추가하기 위한 버튼. 클릭 시 AddKeyword페이지로 이동

32: data.map : keyword를 모두 보여주며 각각의 keyword 클릭 시 keyword에 자세한 페이지로 이동

39: Link : 각각의 keyword를 클릭하면, /keyword/id url로 접근하게 됨

42: button : 각각의 keyword에 대한 삭제 버튼. 클릭 시 서버에 삭제 요청

실행결과.

![image](https://user-images.githubusercontent.com/92558961/148353301-6fc16781-c900-4458-a951-193c236d280f.png)

### Keyword.js

![image](https://user-images.githubusercontent.com/92558961/148353317-9daca122-0238-4607-a297-5df5c94aaa7a.png)

-   6: useParams : 접근된 url에서 keyword/ 이후의 id값을 받아옴
-   7~8: keyword의 key와 value값을 각각 저장할 state
-   11: getDataById : keyword의 key값과 value값을 모두 얻는 함수
-   21: useEffect() : keyword페이지 접근 초기에 keyword데이터 요청
-   25: useEffect() : key와 value값이 성공적으로 저장됬을 때 컨텐츠를 보여줌

![image](https://user-images.githubusercontent.com/92558961/148353325-a4669907-6f98-4627-8479-a106fc450cf0.png)

-   34: keys.map : keyword의 데이터 중 id값을 제외한 나머지 값들을 모두 표현

실행결과.

![image](https://user-images.githubusercontent.com/92558961/148353351-2ec835b8-a515-42ad-9c7f-be1931c9dd25.png)

### AddKeyword.js

![image](https://user-images.githubusercontent.com/92558961/148354248-e49b6e89-aba8-4eea-a85e-62c6edd630eb.png)

-   6~8: useRef : input 태그에 입력된 값을 받아올 수 있는 함수.
-   9: useNavigate : react가 버전업되어 useHistory()가 변경되었습니다.
    -   router로 기억하고 있는 페이지로 이동할 수 있는 함수
-   11: createData : input태그를 이용해 입력받은 데이터를 서버에 요청하여 추가하는 함수
-   12~14: input 태그의 현재 입력된 값을 받아 저장
-   16: 3개의 input태그에 하나라도 빈 값이 없을 때만 데이터를 저장하기 위함
-   18: url서버에 데이터를 추가 요청
-   23: 데이터를 보내기 성공했다면, 알림창으로 성공 메시지를 띄운 후, Home으로 복귀
-   27: 데이터를 보내기 실패했을 때, 알림창으로 내용을 보여줌

![image](https://user-images.githubusercontent.com/92558961/148354321-878178f0-bcc5-4440-afc5-c58bd6df0b03.png)

-   17: input 태그에 속성으로 ref를 사용하여 useRef로 선언한 변수를 지정해주어야 한다.
-   47: 추가할 keyword의 데이터를 모두 입력한 후 버튼을 클릭하면, createData함수 호출
