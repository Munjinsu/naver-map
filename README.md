성모병원(애프터케어) 연구과제 개발 프로젝트 환경구성

1.	리액트(Front-end) 환경 구성 가이드
가.	nodeJs 22  사용 ( 서버가 centOS 7 경우 18이상 이용이 어렵다. 공식지원 X ) 
nodeJs 를 사용하기 위해서 windows 환경에서는 cmd 또는 PowerShell 을 사용한다.
나.	NVM 설치 권장 ( node version managements )  ** 설치경로 권장   C:\nvm
-	Nvm 설치 후 $ nvm install 22 설치해놓는다.  ( $ 표시는 터미널 표현임)
*** 22 버전을 설치해야 더 활용가능한 라이브러리들이 많다. 인프라 환경 여건에 맞춰 사용할것!
다.	Npm 순정 대신 사용성이 좋은 yarn package 권장 
ㄴ 설치 :  $ npm install –global yarn  
** 개발PC가 윈도우 환경일 경우 yarn package 언어 설치 중 아래와 같은 오류가 나면 조치할것.
설치 확인은 … $ yarn -v    // 이때.. 버전정보  ex) 1.22.22  출력 되야 함 (2025.03.30 기준)

 ========= window 환경에서 정책등의 문제발생시 조치  ( 아래와 같은 내용 예시 .. ) =======
 yarn : C:\Program Files\nodejs\yarn.ps1 파일을 로드할 수 없습니다. 
C:\Program Files\nodejs\yarn.ps1 파일이 디지털 서명되지 않았습니다. 현재 시스템에서 이 스크립트를 실행할 수 없습니다. 스크립트 실행 및 실행 정책 설정에 대한 자세한 내용은
 about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)를 참조하십시오..
$ ExecutionPolicy  
  ㄴ 위의 명령으로 정책이 RemoteSigned  이 아닌 경우 에는  yarn 을 호출 할 수 없다.   
$ get-help Set-ExecutionPolicy   명령 사용방법 확인
$ Set-ExecutionPolicy RemoteSigned    적용!!
       ==================================================================
라.	그리드와 차트는 AG 제품군 채택. AG Grid + AG Chart 
-	AG Grid Doc : https://www.ag-grid.com/  
-	AG Chart Doc : https://charts.ag-grid.com/
마.	서버와의 통신은 Axios 사용 (* jquery 의 Ajax 와 같음 ) 
-	Axios Doc : Getting Started | Axios Docs (axios-http.com)  *** 이하 나열 모듈은 패키지로 제공
2.	리액트(Front-end) 프로젝트 스타트업
** 윈도우 환경 기준이며 , 환경은 통일할 것! 편의상 TortoiseSVN 이 필히 수동 설치 한다.
다운로드 url  https://tortoisesvn.net/downloads.html
$ 표시의 명령들은 , 윈도우 환경에서 cmd 및 PowerShell( 관리자 모드 ) 이용하여 셋팅할것!! 
- nvm 설치 권장.  * nvm 버전 1.1.12 (2024.03.05 기준)
관련링크 : https://github.com/coreybutler/nvm-windows#installation--upgrades
설치는 환경 통일성을 위해, 
C:\nvm  
으로 지정할 것! ( ** 실제 위치는 상관없으나, 이후 설명들이 이 루트를 베이스삼아 설명함! )
해당 위치를 루트패스라 지정하겠음.
이후 아래의 설명들은 Window PowerShell 에서 명령을 나타낸다.

nodeJs 22 버전 설치 ( 25.03.30 기준 22 버전은 LTS 버전이 나왔으므로, 지정설치가 필요없음 )
$ nvm install 22

$ nvm list      
  ㄴ  22.14.0 버전으로 설정되어있는지 확인.

$ nvm use 22.14.0
  ㄴ 설정 되어 있지 않으면 셋팅~

- 루트패스에서  편의상  yarn  을 설치한다. 
yarn 설치  ( * 글로벌로만 설치 가능 ) 

$ npm install --global yarn

$ yarn -v 
// 이때.. 버전정보  ex) 1.22.22  출력 되야 함  // 문제 발생시 해당 문서 1. 의 다. 항목을 참조!!
# 글로벌 설치 ( 루트패스에서 실행 할것! )
- parcel 설치 (  빠른 프로젝트 스타트업  * 유용유틸 )
 설치 ( 글로벌로 설치한다 )
$ yarn global add parcel-bundler   
  or 
$ npm install -g parcel-bundler    // 기본 ( * yarn 을 설치 안한경우, 오리지날 명령 )

# 프로젝트 초기 설치시 : create react-app 으로 생성 할 것!
초기 제공된 소스가 있다하여도, 리액트앱으로 생성 후 프로젝트를 시작한다.
** SVN 체크아웃 할때도 이렇게 생성 한 후에 해당 폴더로 체크아웃을 받도록 한다.
$ yarn create react-app aftcr-web
 or
$ npm init react-app aftcr-web  // 기본 ( * yarn 을 설치 안한경우, 오리지날 명령, 이후 동일 설명생략! )

명령을 처리하고 난 이후, 아래의 폴더가 생성됐는지 확인한다.
C:\nvm\aftcr-web\
폴더 안의 node_modules 폴더를 제외한, 모두 삭제한다.( public / src / .gitignore, package.json 등 )
이후 폴더 밖으로 나와서 aftcr-web 폴더를 오른쪽 마우스를 클릭 후, SVN 체크아웃 한다.
체크아웃 형상 URL    svn://172.30.1.62/repo/aftcr-web/trunk

삭제하였던 폴더 및 파일들이 형상을 통해 다시 재생성됐는지 확인하고, PowerShell 돌아가 
$ cd c:\nvm\aftcr-web 동일 경로로 들어와서
$ dir   명령으로 package.json 보이면,
$ yarn install.
명령을 날려 package.json 에 존재하는 모든 라이브러리를 한번에 설치 한다. 
모든 설치가 완료 되었으면, nodeJs 를 기동한다.
$ yarn start     서버가 정상 실행되는지 확인한다. 

서버 중단은 
떠 있는 Window PowerShell  내 ,  ctrl + C   버튼을 하여 서버 중단 할 수 있다.

# 프론트단 설치 요소 ( 퍼블리싱 / 리액트 기준의 모듈 )  ** 해당요소 또한 프로젝트 별에 속함!
   ** 퍼블리셔만 참조할 것!
=== npm 환경에 퍼블리싱에 아주 유용한 Sass 라이브러리  ===

( * 기본적 yarn 전제 베이스로 명령 기술함)
- 반응형디자인 및 매우편리한 색상팔레트 모듈
$ yarn add open-color include-media
 ex )  .scss 에서  라이브러리 사용시  
 @import '~include-media/dist/include-media';
 @import '~open-color/open-color';

- 클래스네임 정리에 * 유용 모듈 
$ yarn add classnames
 *  한번에 설치할때 ...   ex)  $ yarn add sass classnames react-icons
- 스타일 컴퍼넌트  * 유용모듈
$ yarn add styled-components

- 컴퍼넌트 최적화 
$ yarn add react-virtualized
- 불변성 유지 용이
$ yarn add immer
- 리액트 라우터 설치
$ yarn add react-router-dom


3.	애프터케어 백엔드(Springboot-back-end) 환경구성 가이드
가.	디지털팜에서 제공하는 aftercare-app-be-main 소스를 베이스로 한다.
https://github.com/DigitalPharm/aftercare-app-be   << 깃허브( 허용된 개발자만 접근 가능 )
스펙정보 JAVA 17 버전을 사용하고, 스프링부트 3.2.2 버전을 사용하며, 빌드도구는 메이븐을 사용하고 있다. 그리고 백엔드 사용자 인증방식은 토큰 인증방식으로 구현되어 있다.
나.	데이터베이스는 PostgreSQL 14.5 사용
다.	개발툴(IDE-Tools) 은 다온NAS 통해 받아 사용하고, 소스는 SVN 형상 서버 통해 내려받는다.
-	개발툴 위치 :  \\172.30.1.62\share\003. 개발관련\00. dev-tools\IDETools.zip
-	SVN 형상 : svn://172.30.1.62/repo/aftcrApp/trunk 
라.	프로젝트 
-	프로젝트 API KEY : SjINRe0yQSWGTO7Rmezb6w 
4.	스프링부트(Back-end) 프로젝트 스타트업
** 윈도우 환경 기준이며 , 환경은 통일할 것! 편의상 TortoiseSVN 이 필히 수동 설치 한다.
다운로드 url  https://tortoisesvn.net/downloads.html
가.	개발툴은 C:\ 루트에 설치하도록 한다. 
C:\IDETools\
          안의 구성은  
build (자바 빌드도구) / eclipse (IDE프로그램) / java (8/11/17)/ server (tomcat) / workspace (소스경로)
폴더가 존재한다.
나.	workspace 폴더 안으로 들어가서 aftcrApp 이란 폴더명을 생성한다.
C:\IDETools\workspace\aftcrApp
다.	생성 후 해당폴더를 오른쪽마우스로 클릭한 후, 
위의 3-라) 라인에서 SVN 형상 주소를 입력하여, 소스를 svn 체크아웃 받는다.
라.	아래의 경로에서 이클립스를 실행한다. 
C:\Temp\source\IDETools\eclipse\eclipse.exe
마.	프로젝트 import 를 클릭하여, General Existing Projects into Workspace 를 선택하여, 방금 워크스페이스에서 체크아웃 받은 aftcrApp 폴더를 선택하여 Finish 버튼을 클릭하여 프로젝트를 로드 한다.
** 만약 프로젝트를 불러오지 못하면, import 시 Existing Maven Projects 로 불러온다.
바.	여기까지 과정시 이클립스 상에서 SVN 자동연결이 되지 않을 경우, 수동연결 처리 한다. 
aftcrApp 프로젝트 최상단을 오른쪽 마우스로 클릭하여, [ Team ] -> [ Share Projects… ] 를 클릭한다. 다)의 과정으로 인해 최소 체크아웃 받았던 url 이 등록되어 있을 것이며, 각자 본인의 SVN 계정정보만 입력 후( ID / PASSWORD ), Finish 처리 한다. 
사.	aftcrApp 프로젝트 최상단을 오른쪽 마우스로 클릭하여, [ Maven ] -> [ Update Project .. ] 클릭. 
Available Maven Codebases 에  aftcrApp 이 선택되어 있는 상태에서, [ OK ] 버튼을 클릭한다.
아.	소스깨짐이 더 이상 발생하지 않는다면, Boot Dashboard 에서( 툴 기본 Java EE 퍼스펙티브에서는 좌측 하단 탭에서 찾아볼수 있다!) local 트리의 aftcrApp 을 실행시킨다. 
서버실행 요약 : Boot Dashboard  -> local -> aftcrApp -> Start  (or)  Debug
** Default Run 또는 debug Run 은 자율임.
서버 실행 후,
http://localhost:9090/v1/swagger-ui/index.html  으로 접속하여 아래와 같이 접속이 되면 성공!

 



===== 선택 사양  
  ** 처음부터 아래 내용 셋팅해도 되고, 사용해보면서 필요하면 그때 셋팅해도 된다! 

1)	소스구분 체킹 Progress 바가 너무 잦은 발생으로 개발툴이 느려지는 문제가 발생하는 경우. 
개발툴 상단 windows -> Language Servers  에서  전체 선택되어 있는 옵션을 모두 해제한다. 
( 체크박스 모두 해제 후 ) Apply and Close  버튼 클릭! 
2)	프로젝트 자바버전 교체 19 -> 17 버전 다운 그레이드 
현재 김하용 부장이 제공하는 개발툴(IDETools)은 기본 자바 19버전으로 설정되어 있으므로(툴내 history 문서참고), 고객 요구스펙인 자바 17버전에서 지원하지 않는 상위 스펙코드를 기술하면 문제가 발생할수 있다. 기본적으로 자바는 8이상 버전 이후부터는 하위호환성이 준수함으로 그대로 사용해도 문제없으나, 코드작성시 실수를 예방하는 차원이라면 아래의 작업을 추가로 진행하여 자바버전을 다운그레이드 하도록 한다.

가) 자바 파일 추가:
이클립스 상단 메뉴에서 [ Window ] -> [ Preferences ] 를 선택
좌측 메뉴에서  [ Java ] -> [ Installed JREs ] 를 클릭.
** 여기에서 현재 설치된 JDK 및 JRE 를 볼수 있음.
[ Add… ] 를 클릭하여 추가. 툴내 \IDETools\java\ 에 다운그레이드 자바 8/11/17 버전 존재.
[ Standard VM ] 을 클릭하고, \IDETools\java\jdk-17.0.9\ 를 선택
(bin, lib 폴더가 아닌 자바 최상위 폴더를 선택해야 함! 8버전인 경우는 JRE 폴더를 선택해야함! ) 
추가된 JDK(jre)를 변경하고, Finish 를 눌러 완료.

나) 프로젝트 자바 버전 변경:
프로젝트 위에서 우클릭하고 [ Properties ] 를 선택.
좌측 메뉴에서 [ Project Facets ] 로 이동.
보여지는 Java의 Version 을 17 버전으로 변경한다.
** 목록 화면으로 나열되어야 하는데, 나열되지 않은 경우는 (목록에서 아예 나열되지 않고 convert … 가 뜨는 경우는 convert 를 클릭 한 이후 ) 창을 나갔다가 다시 들어온다.
변경 후 OK를 클릭!!

다) Build Path 변경:
다시 프로젝트의 [ Properties ] 로 들어간다. 
왼쪽의 [ Java Build Path ] 를 클릭.
목록의 JRE System Library 를 더블클릭 후 
Execution environment 설정을 Alternate JRE 로 변경하고 자바 버전을  17 로 선택.
Finish 를 클릭하여 변경 사항을 적용.

======= 



5.	디지털팜 인증서버 로그인 설명   ** 디지털팜 제공 
** 아래 내용은 샘플이니, 운영방식 내용만 참조 .
•	로직 정의 
o	[자동 로그인]
  
1.	jToken 유효 만료 시
	reflashToken을 이용하여 인증서버를 통해 jToken 재발급 수행
2.	reflashToken 유효 만료 시
	다시 로그인 페이지에서 로그인 진행
________________________________________
o	[회원 탈퇴]
	탈퇴 요청 (Header 에 jToken 입력)
 
•	Swagger
o	인증서버 연동 규격서 
https://dev-auth-cmccareplus.digitalpharm.net/v1/swagger-ui/index.html
o	인증서버 api key : DE3Dm711QtynYjOVc34-tQ  
o	애프터케어 연동 규격서 (* 노션 공유 )
https://www.notion.so/digitalpharm/6-e527877924f945729df0d34bbe32dbb3
