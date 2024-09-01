// 배경음악 설정
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

// 음악 재생/일시정지 토글 함수
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🔇';
    } else {
        bgMusic.play();
        musicToggle.textContent = '🔊';
    }
    isMusicPlaying = !isMusicPlaying;
}

// 음악 토글 버튼에 이벤트 리스너 추가
musicToggle.addEventListener('click', toggleMusic);

// 음악 초기 볼륨 설정
async function initialize() {
    bgMusic.volume = 0.2;
}

// 캔버스 및 컨텍스트 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameContainer = document.getElementById('gameContainer');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementsByClassName('close')[0];
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');

let scale = 1;  //화면 크기에 따른 스케일 조정
const baseWidth = 1920;  // 기본 화면 너비
const baseHeight = 1080;  // 기본 화면 높이

// 이미지 로드
const playerImg = new Image();
const backgroundImg = new Image();
let imagesLoaded = 0;

// 이미지 로드 함수
function loadImages() {
    return new Promise((resolve) => {
        playerImg.onload = backgroundImg.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 2) resolve();
        };
        playerImg.src = 'img/player.png';
        backgroundImg.src = 'img/house.png';
    });
}

// 플레이어 설정
const player = {
    x: baseWidth / 2,
    y: baseHeight / 2,
    size: 160,
    speed: 60
};

// 인터랙션 존 설정
const zones = [
    // 각각의 프로젝트와 연관된 영역들 설정
    {
        x: 200, y: 200, size: 60,
        title: 'Awesome Css',
        content: 'CSS와 JavaScript로 그린 우주 천체 시뮬레이션',
        description: '이 프로젝트는 CSS와 JavaScript를 사용하여 인터랙티브한 우주 테마 웹페이지를 구현했습니다. CSS keyframe 애니메이션으로 다양한 우주 요소들의 움직임을 표현했고, JavaScript로 동적 요소 생성과 스크롤 기반 인터랙션을 구현했습니다. ',
        image: 'img/css_skill.png',
        link: 'https://sehyunsin.github.io/Awesome_Css/'
    },
    {
        x: baseWidth - 300, y: 200, size: 60,
        title: '메타포뮬러 영양제 PLUSEED',
        content: '제품 홍보 웹사이트 제작',
        description: '이 웹사이트는 HTML과 CSS를 사용하여 메타포뮬러의 영양제 PLUSEED의 정보를 제공하는 반응형 페이지를 구현했습니다. CSS Flexbox를 활용하여 레이아웃을 구성했고, 클래스 기반의 스타일링으로 재사용성을 높였습니다. jQuery를 사용하여 동적 요소와 사용자 인터랙션을 구현했으며, 외부 리소스(YouTube)를 임베드하여 콘텐츠를 풍부하게 만들었습니다. 반응형 디자인과 영어 지원을 통해 사용자 접근성을 개선했으며, 전체적으로 브랜드 이미지와 제품 정보를 효과적으로 전달하기 위해 노력 했습니다.',
        image: 'img/pluseed.png',
        link: 'https://pluseed.com/main/pc/ko/main'
    },
    {
        x: baseWidth - 200, y: 200, size: 60,
        title: '나의 PROFILE',
        content: '저의 프로필 노션 웹사이트 입니다!',
        description: '이 웹사이트는 HTML과 CSS를 사용하여 메타포뮬러의 영양제 PLUSEED의 정보를 제공하는 반응형 페이지를 구현했습니다. CSS Flexbox를 활용하여 레이아웃을 구성했고, 클래스 기반의 스타일링으로 재사용성을 높였습니다. jQuery를 사용하여 동적 요소와 사용자 인터랙션을 구현했으며, 외부 리소스(YouTube)를 임베드하여 콘텐츠를 풍부하게 만들었습니다. 반응형 디자인과 영어 지원을 통해 사용자 접근성을 개선했으며, 전체적으로 브랜드 이미지와 제품 정보를 효과적으로 전달하기 위해 노력 했습니다.',
        image: 'img/pluseed.png',
        link: 'https://pluseed.com/main/pc/ko/main'
    },
    {
        x: 200, y: baseHeight - 300, size: 60,
        title: '에이아이더뉴트리진 홈페이지 리뉴얼',
        content: '에이아이더뉴트리진 회사 홍보 웹사이트 제작',
        description: '이 프로젝트는 에이아이더뉴트리진 이라는 회사 홍보 웹사이트로, 현대적인 웹 개발 기술을 활용하여 사용자 경험을 극대화했습니다. jQuery와 Fullpage.js를 기반으로 단일 페이지 애플리케이션(SPA)을 구현하여 부드러운 페이지 전환 효과를 만들었습니다.특히 Swiper 라이브러리를 사용한 동적 슬라이더와 JavaScript를 활용한 실시간 콘텐츠 업데이트 기능을 통해 사용자 인터랙션을 강화했습니다. 또한, CSS를 효과적으로 활용하여 반응형 디자인을 적용함으로써 다양한 디바이스에서의 일관된 사용자 경험을 보장했습니다.멀티미디어 요소의 통합, 특히 유튜브 영상 임베딩을 통해 콘텐츠의 풍부성을 높였으며, 전체적으로 기업의 브랜드 이미지를 효과적으로 전달할 수 있는 인터페이스를 구현했습니다.',
        image: 'img/aithe_re.png',
        link: 'https://sehyunsin.github.io/aitn_re/'
    },
    {
        x: baseWidth - 300, y: baseHeight - 300, size: 60,
        title: '메타포뮬러 쇼핑몰',
        content: '메타포뮬러 쇼핑몰 유지 보수 및 운영',
        description: '메타포뮬러라는 기존에 제작 되어 있는 쇼핑몰 웹사이트의 각종 이벤트나 팝업 상세페이지 웹사이트의 변경 등과 게시물 관리 및 php를 이용한 회원의 이용 관리 등의 유지 보수 및 운영을 하였습니다.',
        image: 'img/meta.png',
        link: 'https://www.metaformula.co.kr/main/index'
    },
    {
        x: baseWidth / 2, y: 200, size: 60,
        title: 'AI Bird',
        content: 'Explore my Python skills!',
        description: 'This Python project demonstrates my ability to work with data processing and analysis. It includes usage of libraries like Pandas and NumPy, and visualizations created with Matplotlib.',
        image: 'img/aibird.png',
        link: 'https://www.aibirdinfo.com/main/index'
    },
    {
        x: baseWidth / 2, y: baseHeight - 300, size: 60,
        title: 'FITTING ME',
        content: 'Check out my mobile app development!',
        description: 'This mobile app, developed using React Native, showcases my ability to create cross-platform mobile applications. It features a clean UI, efficient state management, and integration with native device features.',
        image: 'img/fitting.png',
        link: 'https://ohmyfashion.ai/index.php'
    },
    {
        x: 200, y: baseHeight / 2, size: 60,
        title: 'LOPAI',
        content: 'Interactive data visualizations!',
        description: 'This project focuses on creating interactive data visualizations using D3.js. It demonstrates my ability to transform complex datasets into meaningful and visually appealing representations.',
        image: 'img/lopai.png',
        link: 'https://lopai.net/main/index'
    },
    {
        x: baseWidth - 300, y: baseHeight / 2, size: 60,
        title: 'OBD',
        content: 'AI and ML projects showcase',
        description: 'This machine learning project demonstrates my skills in AI and data science. It includes implementation of various ML algorithms, data preprocessing, and model evaluation techniques using Python and scikit-learn.',
        image: 'img/obd.png',
        link: 'https://denomicsobd.com/'
    }
];

// 캔버스 크기 조정 함수
function resizeCanvas() {
    const windowRatio = window.innerWidth / window.innerHeight;
    const gameRatio = baseWidth / baseHeight;

    if (windowRatio < gameRatio) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / gameRatio;
    } else {
        canvas.width = window.innerHeight * gameRatio;
        canvas.height = window.innerHeight;
    }

    scale = canvas.width / baseWidth;
    ctx.scale(scale, scale);

    gameContainer.style.width = `${canvas.width}px`;
    gameContainer.style.height = `${canvas.height}px`;

    updateStarPositions();  // 별 위치 업데이트
}

// 별 모양 SVG 생성 함수
function createStarSVG(size) {
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    const points = [];
    for (let i = 0; i < 10; i++) {
        const angle = i * Math.PI / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        points.push(`${radius * Math.cos(angle)},${radius * Math.sin(angle)}`);
    }
    return `<svg width="${size}" height="${size}" viewBox="-${size/2} -${size/2} ${size} ${size}">
        <polygon points="${points.join(' ')}" fill="#FFFF00" stroke="rgba(100, 200, 255, 0.7)" stroke-width="2" />
    </svg>`;
}

// 별 영역 생성 함수
function createStarZones() {
    zones.forEach((zone, index) => {
        const star = document.createElement('div');
        star.className = 'star-zone';
        star.id = `star-${index}`;
        star.innerHTML = createStarSVG(zone.size);
        star.style.animation = `twinkle ${1 + Math.random()}s infinite`;
        gameContainer.appendChild(star);
    });
}

// 별 위치 업데이트 함수
function updateStarPositions() {
    zones.forEach((zone, index) => {
        const star = document.getElementById(`star-${index}`);
        star.style.left = `${zone.x * scale}px`;
        star.style.top = `${zone.y * scale}px`;
        star.style.transform = `scale(${scale})`;
    });
}

// 플레이어 이미지 그리기 함수
function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
}

// 게임 업데이트 함수
function update() {
    ctx.clearRect(0, 0, baseWidth, baseHeight);
    ctx.drawImage(backgroundImg, 0, 0, baseWidth, baseHeight);
    drawPlayer();
    checkCollision();  // 충돌 체크
}

// 플레이어와 인터랙션 존의 충돌 체크 함수
function checkCollision() {
    let inZone = false;
    zones.forEach((zone, index) => {
        const star = document.getElementById(`star-${index}`);
        if (
            player.x < zone.x + zone.size &&
            player.x + player.size > zone.x &&
            player.y < zone.y + zone.size &&
            player.y + player.size > zone.y
        ) {
            inZone = true;
            if (modal.style.display === 'none') {
                star.style.animation = 'reach 0.5s ease-in-out';
                setTimeout(() => {
                    star.style.animation = `twinkle ${1 + Math.random()}s infinite`;
                }, 500);
                openModal(zone.title, zone.content, zone.description, zone.image, zone.link);
            }
        }
    });
    // 모달이 열려있고 존에 있지 않을 때만 모달을 닫음
    if (!inZone && modal.style.display !== 'none') {
        closeModal();
    }
}

// 모달 창 닫기 함수
function closeModal() {
    modal.style.display = 'none';
    // 모달이 닫힐 때 플레이어를 약간 이동시켜 즉시 재오픈되는 것을 방지
    player.x += 1;
    player.y += 1;
    update();
}

// 모달 창 열기 함수
function openModal(title, content, description, image, link) {
    modalTitle.textContent = title;
    modalContent.innerHTML = `
        <img src="${image}" alt="${title}" class="project-image">
        <p class="project-description">${content}</p>
        <p class="project-description">${description}</p>
        <a href="${link}" target="_blank"class="project-link">View Project</a>
        `;
    modal.style.display = 'block';
}

// 모달 닫기 버튼 클릭 이벤트
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// 키보드 입력 처리 함수
function handleInput(e) {
    const move = player.speed / scale;
    switch(e.key) {
        case 'ArrowUp': player.y = Math.max(0, player.y - move); break;
        case 'ArrowDown': player.y = Math.min(baseHeight - player.size, player.y + move); break;
        case 'ArrowLeft': player.x = Math.max(0, player.x - move); break;
        case 'ArrowRight': player.x = Math.min(baseWidth - player.size, player.x + move); break;
    }
    update(); 
}

// 터치 시작 위치 저장 함수
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

// 터치 이동 처리 함수
function handleTouchMove(e) {
    e.preventDefault();
    let touchEndX = e.touches[0].clientX;
    let touchEndY = e.touches[0].clientY;
    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;
    const move = player.speed / scale;

    if (Math.abs(dx) > Math.abs(dy)) {
        player.x = Math.max(0, Math.min(baseWidth - player.size, player.x + dx * move / 50));
    } else {
        player.y = Math.max(0, Math.min(baseHeight - player.size, player.y + dy * move / 50));
    }

    touchStartX = touchEndX;
    touchStartY = touchEndY;
    update(); 
}

// 채팅 메시지 추가 함수
function addMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 채팅 메시지 전송 함수
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('You', message);
        messageInput.value = '';
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage('뉴비세현', response);
        }, 1000);
    }
}

// 키워드와 관련된 응답을 반환하는 함수
const keywords = {
    "이름": "제 이름은 신세현입니다. 1989년 11월 8일생으로, 현재 34세입니다.",
    "생일": "저는 1989년 11월 8일에 태어났습니다.",
    "생년월일": "제 생년월일은 1989년 11월 8일입니다.",
    "출생": "1989년 11월 8일에 태어났습니다.",

    "학력": "강원대학교에서 공공행정학과를 졸업했습니다.",
    "학교": "강원대학교 공공행정학과를 졸업했습니다.",
    "졸업": "저는 강원대학교 공공행정학과를 졸업했습니다.",

    "연락처": "제 연락처는 010-5192-6117이며, 이메일은 finisher89s@gmail.com 입니다. 연락 주시면 감사하겠습니다!",
    "이메일": "이메일은 finisher89s@gmail.com 입니다. 연락 기다리겠습니다!",
    "전화번호": "제 전화번호는 010-5192-6117입니다. 언제든지 연락주세요.",
    "연락": "저에게 연락하시려면 010-5192-6117로 전화주시거나 finisher89s@gmail.com으로 이메일 보내주세요.",

    "경력": "저는 2018년부터 2019년까지 모바일 플랫폼 서비스 회사 '포레스트'를 창업하여 소셜미디어 앱 'Bloom'을 기획 및 디자인했습니다. 이후 2022년 3월부터 2024년 7월까지 (주)에이아이더뉴트리진에서 IT솔루션 선임으로 근무하며, 어플리케이션 서비스 기획 및 디자인, 자사 쇼핑몰 및 홈페이지 리뉴얼, 자사 및 외주 AI 서비스 페이지 기획 등을 담당했습니다.",
    "경험": "2018-2019년 동안 '포레스트'라는 모바일 플랫폼 서비스 회사를 창업했고, 2022년부터 2024년까지 (주)에이아이더뉴트리진에서 IT솔루션 선임으로 근무했습니다.",
    "직장": "과거에는 '포레스트'라는 회사를 창업했고, 최근에는 (주)에이아이더뉴트리진에서 IT솔루션 선임으로 근무했습니다.",
    "이력": "2018년부터 '포레스트'라는 회사를 창업해 소셜미디어 앱 'Bloom'을 기획 및 디자인했고, 이후 (주)에이아이더뉴트리진에서 IT솔루션 선임으로 근무했습니다.",
    "프로젝트" : "저는 2018년부터 2019년까지 모바일 플랫폼 서비스 회사 '포레스트'를 창업하여 소셜미디어 앱 'Bloom'을 기획 및 디자인했습니다. 이후 2022년 3월부터 2024년 7월까지 (주)에이아이더뉴트리진에서 IT솔루션 선임으로 근무하며, 어플리케이션 서비스 기획 및 디자인, 자사 쇼핑몰 및 홈페이지 리뉴얼, 자사 및 외주 AI 서비스 페이지 기획 등을 담당했습니다.",

    "기술": "저는 HTML, CSS, SCSS, JavaScript, React.js, jQuery, Git, Flutter, Figma 등의 기술을 보유하고 있습니다.",
    "스킬": "주요 기술로는 HTML, CSS, SCSS, JavaScript, React.js, jQuery, Git, Flutter, Figma 등이 있습니다.",
    "프로그래밍": "HTML, CSS, SCSS, JavaScript, React.js, jQuery, Git, Flutter, Figma 등의 프로그래밍 기술을 다룰 수 있습니다.",
    "코딩": "HTML, CSS, SCSS, JavaScript, React.js, jQuery, Git, Flutter, Figma 등을 이용한 코딩이 가능합니다.",
    "할줄": "HTML, CSS, SCSS, JavaScript, React.js, jQuery, Git, Flutter, Figma 등을 이용한 코딩이 가능합니다.",

    "군대": "저는 군 복무를 마쳤습니다.",
    "병역": "군 복무를 완료했습니다.",
    "군복무": "저는 군 복무를 마친 상태입니다.",

    "취미": "취미로는 탁구, 영화 감상, 클라이밍, 그리고 강아지와 산책하는 것을 좋아합니다.",
    "여가": "여가 시간에는 탁구, 영화, 클라이밍을 즐기며, 강아지와 산책하는 것도 좋아합니다.",
    "좋아하는 활동": "탁구, 영화, 클라이밍, 강아지와의 산책 등이 저의 주요 취미입니다.",
    "취미생활": "탁구, 영화 감상, 클라이밍, 그리고 강아지와의 산책이 취미입니다.",

    "mbti": "저의 MBTI는 INTP입니다.",
    "성격유형": "제 MBTI 성격유형은 INTP입니다.",
    "성격": "제 성격은 INTP 유형으로, 분석적이고 창의적입니다.",

    "성격": "저는 개방적인 사고방식과 부드러운 친화력을 지니고 있으며, 객관적으로 분석하는 능력과 풍부한 상상력, 독창성을 가지고 있습니다.",
    "성향": "제 성향은 개방적이고 친화력이 좋으며, 객관적인 분석 능력과 창의력을 겸비하고 있습니다.",
    "사고방식": "저는 개방적이고 부드러운 사고방식을 가지고 있으며, 창의적이고 분석적인 면이 강합니다.",

    "목표": "제 목표는 풍족하고 평온한 노후를 보내는 것입니다. 그리고 책임감 있는 어른이 되는 것 입니다.",
    "미래": "저의 미래 목표는 풍족하고 평온한 노후를 보내는 것입니다. 그리고 책임감 있는 어른이 되는 것 입니다.",
    "비전": "저는 평온하고 풍족한 노후를 목표로 하고 있습니다. 그리고 책임감 있는 어른이 되는 것 입니다.",

    "꿈": "저의 꿈은 훗날 작가가 되는 것입니다.",
    "희망": "저는 훗날 작가가 되는 것을 꿈꾸고 있습니다.",
    "장래희망": "저의 장래희망은 훗날 작가가 되는것 입니다.",

    "종교": "저는 무교이지만 불교 사상을 좋아합니다.",
    "신앙": "종교는 없지만, 불교 사상을 좋아합니다.",
    "믿음": "무교이지만 불교 사상에 관심이 있습니다.",

    "좋아하는 것": "제가 좋아하는 것은 강아지, 영화, 책입니다.",
    "좋아": "제가 좋아하는 것은 강아지, 영화, 책입니다.",
    "취향": "강아지와 영화, 책을 좋아합니다.",
    "선호": "강아지와 영화, 책을 좋아합니다.",

    "여자친구": "현재 여자친구가 있습니다.",
    "연애": "여자친구가 있습니다.",
    "연인": "현재 여자친구가 있습니다.",

    "안녕": "안녕하세요! 제 포트폴리오 챗봇에 오신 것을 환영합니다. 무엇을 도와드릴까요?",
    "hi": "안녕하세요! 제 포트폴리오 챗봇에 오신 것을 환영합니다. 무엇을 도와드릴까요?",
    "하이": "안녕하세요! 제 포트폴리오 챗봇에 오신 것을 환영합니다. 무엇을 도와드릴까요?",
    "인사": "안녕하세요! 무엇을 도와드릴까요?",
    "환영": "반갑습니다! 제 포트폴리오에 오신 것을 환영합니다. 도와드릴 일이 있나요?",

    "작별": "관심 가져주셔서 감사합니다! 추가로 궁금한 사항이 있으면 언제든지 연락 주세요. 안녕히 가세요!",
    "바이": "관심 가져주셔서 감사합니다! 추가로 궁금한 사항이 있으면 언제든지 연락 주세요. 안녕히 가세요!",
    "빠이": "관심 가져주셔서 감사합니다! 추가로 궁금한 사항이 있으면 언제든지 연락 주세요. 안녕히 가세요!",
    "bye": "관심 가져주셔서 감사합니다! 추가로 궁금한 사항이 있으면 언제든지 연락 주세요. 안녕히 가세요!",
    "안녕히": "감사합니다! 언제든지 연락 주세요. 안녕히 가세요!",
    "헤어짐": "제 포트폴리오에 관심을 가져주셔서 감사합니다. 필요하시면 언제든지 연락주세요. 안녕히 가세요!",
    "default": "제가 이해하지 못한 것 같아요. 다시 설명해주시겠어요? 아니면 제 프로젝트, 기술, 경험, 교육, 또는 연락처 정보에 대해 물어봐 주시겠어요?"
};

// AI 응답을 생성하는 함수
function getAIResponse(message) {
    message = message.toLowerCase();
    for (let key in keywords) {
        if (message.includes(key)) {
            return keywords[key];
        }
    }
    return keywords["default"];
}

// 초기화 함수
async function initialize() {
    await loadImages();  // 이미지 로드
    createStarZones();  // 별 영역 생성
    resizeCanvas();  // 캔버스 크기 조정
    update();  // 게임 화면 업데이트
    // 채팅 시작 메시지 추가
    addMessage('뉴비세현', "안녕하세요 [뉴비세현]의 포트폴리오 입니다~! 방향키를 움직여 별을 통해 저의 포트폴리오들을 감상해 주시고 저와 관련된 사항이나 궁금하신 질문 [EX : 이름,경력,연락처 등]의 키워드를 주시면 뉴비세현이가 친절히 대답해 드리겠습니다. 감사합니다!!");
}

// 이벤트 리스너 등록
document.addEventListener('keydown', handleInput);
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('resize', () => {
    resizeCanvas();
    update();
});

// Enter 키로 메시지 전송
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 모바일 컨트롤 버튼과 관련된 함수들
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

// 모바일 입력 처리 함수
function handleMobileInput(direction) {
    const move = player.speed / scale;
    switch(direction) {
        case 'up': player.y = Math.max(0, player.y - move); break;
        case 'down': player.y = Math.min(baseHeight - player.size, player.y + move); break;
        case 'left': player.x = Math.max(0, player.x - move); break;
        case 'right': player.x = Math.min(baseWidth - player.size, player.x + move); break;
    }
    update();
    // 모달이 열려있을 때는 충돌 체크를 하지 않음
    if (modal.style.display === 'none') {
        checkCollision();
    }
}

// 모바일 컨트롤 버튼에 터치 이벤트 리스너 추가
upButton.addEventListener('touchstart', () => handleMobileInput('up'));
downButton.addEventListener('touchstart', () => handleMobileInput('down'));
leftButton.addEventListener('touchstart', () => handleMobileInput('left'));
rightButton.addEventListener('touchstart', () => handleMobileInput('right'));

// 모바일 컨트롤 연속 이동을 위한 인터벌 설정
let moveInterval;
const startMoveInterval = (direction) => {
    moveInterval = setInterval(() => handleMobileInput(direction), 100);
};
const stopMoveInterval = () => {
    clearInterval(moveInterval);
};

// 터치 시작 및 종료 시 연속 이동 제어
upButton.addEventListener('touchstart', (e) => { e.preventDefault(); startMoveInterval('up'); });
downButton.addEventListener('touchstart', (e) => { e.preventDefault(); startMoveInterval('down'); });
leftButton.addEventListener('touchstart', (e) => { e.preventDefault(); startMoveInterval('left'); });
rightButton.addEventListener('touchstart', (e) => { e.preventDefault(); startMoveInterval('right'); });

upButton.addEventListener('touchend', (e) => { e.preventDefault(); stopMoveInterval(); });
downButton.addEventListener('touchend', (e) => { e.preventDefault(); stopMoveInterval(); });
leftButton.addEventListener('touchend', (e) => { e.preventDefault(); stopMoveInterval(); });
rightButton.addEventListener('touchend', (e) => { e.preventDefault(); stopMoveInterval(); });

// 기존의 handleTouchMove 함수는 제거하거나 주석 처리합니다
// canvas.addEventListener('touchmove', handleTouchMove, false);

// 화면 크기에 따라 모바일 컨트롤 표시 여부 결정
function updateMobileControls() {
    const mobileControls = document.getElementById('mobileControls');
    if (window.innerWidth <= 768) {
        mobileControls.style.display = 'flex';
    } else {
        mobileControls.style.display = 'none';
    }
}

// 화면 크기 변화 시 모바일 컨트롤 업데이트
window.addEventListener('resize', updateMobileControls);
updateMobileControls(); // 초기 로드 시 실행

// 게임 초기화 및 시작
initialize();
