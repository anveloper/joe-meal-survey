// 데이터 저장
let menuName = "";
let password = "";
let yesVotes = 0;
let noVotes = 0;
let selectedGradient = "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"; // 기본 그라데이션

// localStorage 키
const STORAGE_KEYS = {
  menuName: "mealSurvey_menuName",
  password: "mealSurvey_password",
  yesVotes: "mealSurvey_yesVotes",
  noVotes: "mealSurvey_noVotes",
  gradient: "mealSurvey_gradient",
  isStarted: "mealSurvey_isStarted",
};

// localStorage에 데이터 저장
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEYS.menuName, menuName);
  localStorage.setItem(STORAGE_KEYS.password, password);
  localStorage.setItem(STORAGE_KEYS.yesVotes, yesVotes.toString());
  localStorage.setItem(STORAGE_KEYS.noVotes, noVotes.toString());
  localStorage.setItem(STORAGE_KEYS.gradient, selectedGradient);
  localStorage.setItem(STORAGE_KEYS.isStarted, "true");
}

// localStorage에서 데이터 불러오기
function loadFromLocalStorage() {
  const savedMenuName = localStorage.getItem(STORAGE_KEYS.menuName);
  const savedPassword = localStorage.getItem(STORAGE_KEYS.password);
  const savedYesVotes = localStorage.getItem(STORAGE_KEYS.yesVotes);
  const savedNoVotes = localStorage.getItem(STORAGE_KEYS.noVotes);
  const savedGradient = localStorage.getItem(STORAGE_KEYS.gradient);
  const isStarted = localStorage.getItem(STORAGE_KEYS.isStarted);

  if (isStarted === "true" && savedMenuName && savedPassword) {
    menuName = savedMenuName;
    password = savedPassword;
    yesVotes = parseInt(savedYesVotes) || 0;
    noVotes = parseInt(savedNoVotes) || 0;
    selectedGradient = savedGradient || selectedGradient;

    // 화면 전환
    document.getElementById("setupScreen").style.display = "none";
    document.getElementById("voteScreen").style.display = "flex";
    document.getElementById("resultsIcon").style.display = "flex";
    document.getElementById("fullscreenIcon").style.display = "flex";
    document.getElementById("menuNameDisplay").textContent = menuName;

    // 배경색 적용
    document.body.style.background = selectedGradient;

    // 전체 화면 모드로 전환
    document.querySelector(".container").classList.add("fullscreen");

    // 저장된 색상에 맞는 버튼에 active 클래스 추가
    const colorButtons = document.querySelectorAll(".color-btn");
    colorButtons.forEach((btn) => {
      if (btn.getAttribute("data-gradient") === selectedGradient) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    return true;
  }
  return false;
}

// 모든 데이터 초기화
function resetAllData() {
  // localStorage 초기화
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));

  // 변수 초기화
  menuName = "";
  password = "";
  yesVotes = 0;
  noVotes = 0;
  selectedGradient = "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";

  // 배경색 초기화
  document.body.style.background = selectedGradient;

  // 입력 필드 초기화
  document.getElementById("menuNameInput").value = "";
  document.getElementById("passwordInput").value = "";

  // 첫 번째 색상 버튼 active로 설정
  const colorButtons = document.querySelectorAll(".color-btn");
  colorButtons.forEach((btn, index) => {
    if (index === 0) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 화면 전환
  document.getElementById("resultsScreen").style.display = "none";
  document.getElementById("voteScreen").style.display = "none";
  document.getElementById("setupScreen").style.display = "block";
  document.getElementById("resultsIcon").style.display = "none";
  document.getElementById("fullscreenIcon").style.display = "none";

  // 전체 화면 모드 해제
  document.querySelector(".container").classList.remove("fullscreen");
}

// 초기 설정
function startSurvey() {
  const menuInput = document.getElementById("menuNameInput").value.trim();
  const passInput = document.getElementById("passwordInput").value.trim();

  if (!menuInput || !passInput) {
    alert("메뉴 이름과 비밀번호를 모두 입력해주세요.");
    return;
  }

  menuName = menuInput;
  password = passInput;

  // localStorage에 저장
  saveToLocalStorage();

  document.getElementById("setupScreen").style.display = "none";
  document.getElementById("voteScreen").style.display = "flex";
  document.getElementById("resultsIcon").style.display = "flex";
  document.getElementById("fullscreenIcon").style.display = "flex";
  document.getElementById("menuNameDisplay").textContent = menuName;

  // 전체 화면 모드로 전환
  document.querySelector(".container").classList.add("fullscreen");
}

// 투표하기
function vote(choice, event) {
  if (choice === "yes") {
    yesVotes++;
  } else {
    noVotes++;
  }

  // localStorage에 저장
  saveToLocalStorage();

  // 클릭한 버튼에 애니메이션 추가
  const clickedButton = event.target;
  clickedButton.classList.add("voted");

  // 물결 효과 생성
  createRipple(clickedButton);

  // 애니메이션 종료 후 클래스 제거
  setTimeout(() => {
    clickedButton.classList.remove("voted");
  }, 600);

  // 감사 메시지 표시
  const thankYou = document.getElementById("thankYou");
  if (thankYou) {
    thankYou.style.display = "block";

    // 1.5초 후 메시지 숨기기
    setTimeout(() => {
      thankYou.style.display = "none";
    }, 1500);
  }
}

// 물결 효과 생성
function createRipple(button) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  // 버튼과 컨테이너의 위치 가져오기
  const buttonRect = button.getBoundingClientRect();
  const container = button.parentElement;
  const containerRect = container.getBoundingClientRect();

  // 버튼 중앙 위치 계산 (컨테이너 기준)
  const centerX = buttonRect.left - containerRect.left + buttonRect.width / 2;
  const centerY = buttonRect.top - containerRect.top + buttonRect.height / 2;

  // 물결 크기 설정
  const size = Math.max(buttonRect.width, buttonRect.height) * 2.5;

  ripple.style.width = size + "px";
  ripple.style.height = size + "px";
  ripple.style.left = centerX - size / 2 + "px";
  ripple.style.top = centerY - size / 2 + "px";
  ripple.style.background = selectedGradient;

  // 버튼이 아닌 버튼 컨테이너에 추가
  container.appendChild(ripple);

  // 애니메이션 종료 후 제거
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// 비밀번호 모달 표시
function showPasswordModal() {
  document.getElementById("passwordModal").style.display = "flex";
  document.getElementById("passwordCheck").value = "";
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("passwordCheck").focus();
}

// 비밀번호 모달 닫기
function closePasswordModal() {
  document.getElementById("passwordModal").style.display = "none";
}

// 비밀번호 확인
function checkPassword() {
  const inputPassword = document.getElementById("passwordCheck").value;
  const hiddenPassword = "whxogks"; // 히든 비밀번호

  if (inputPassword === password || inputPassword === hiddenPassword) {
    closePasswordModal();
    showResults();
  } else {
    document.getElementById("errorMessage").style.display = "block";
  }
}

// 색상 변경 함수
function changeBackgroundColor(gradient) {
  selectedGradient = gradient;
  document.body.style.background = gradient;
  // localStorage에 저장 (이미 시작된 경우에만)
  const isStarted = localStorage.getItem(STORAGE_KEYS.isStarted);
  if (isStarted === "true") {
    localStorage.setItem(STORAGE_KEYS.gradient, selectedGradient);
  }
}

// 색상 버튼 클릭 이벤트 설정
function setupColorPicker() {
  const colorButtons = document.querySelectorAll(".color-btn");
  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 모든 버튼에서 active 클래스 제거
      colorButtons.forEach((btn) => btn.classList.remove("active"));
      // 클릭된 버튼에 active 클래스 추가
      this.classList.add("active");
      // 배경색 변경
      const gradient = this.getAttribute("data-gradient");
      changeBackgroundColor(gradient);
    });
  });
}

// Enter 키로 비밀번호 확인
document.addEventListener("DOMContentLoaded", function () {
  // localStorage에서 데이터 복원
  loadFromLocalStorage();

  // 색상 선택 기능 초기화
  setupColorPicker();

  // 비밀번호 입력 엔터키 이벤트
  document.getElementById("passwordCheck").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });
});

// 결과 화면 표시
function showResults() {
  const total = yesVotes + noVotes;
  const yesPercent = total > 0 ? Math.round((yesVotes / total) * 100) : 0;
  const noPercent = total > 0 ? Math.round((noVotes / total) * 100) : 0;

  document.getElementById("resultsMenuName").textContent = menuName;
  document.getElementById("yesCount").textContent = yesVotes;
  document.getElementById("noCount").textContent = noVotes;
  document.getElementById("totalCount").textContent = total;
  document.getElementById("yesPercentage").textContent = yesPercent + "%";
  document.getElementById("noPercentage").textContent = noPercent + "%";

  document.getElementById("yesFill").style.width = yesPercent + "%";
  document.getElementById("noFill").style.width = noPercent + "%";

  document.getElementById("voteScreen").style.display = "none";
  document.getElementById("resultsScreen").style.display = "block";

  // 전체 화면 모드 해제
  document.querySelector(".container").classList.remove("fullscreen");
}

// 투표 화면으로 돌아가기
function backToVote() {
  document.getElementById("resultsScreen").style.display = "none";
  document.getElementById("voteScreen").style.display = "flex";

  // 전체 화면 모드로 전환
  document.querySelector(".container").classList.add("fullscreen");
}

// 브라우저 전체화면 토글
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // 전체화면 진입
    document.documentElement.requestFullscreen().catch((err) => {
      console.error("전체화면 요청 실패:", err);
    });
  } else {
    // 전체화면 나가기
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// 전체화면 상태 변경 감지
document.addEventListener("fullscreenchange", function () {
  const expandIcon = document.getElementById("expandIcon");
  const compressIcon = document.getElementById("compressIcon");

  if (document.fullscreenElement) {
    // 전체화면 모드
    expandIcon.style.display = "none";
    compressIcon.style.display = "block";
  } else {
    // 일반 모드
    expandIcon.style.display = "block";
    compressIcon.style.display = "none";
  }
});
