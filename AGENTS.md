# 🌐 Wavit Studio 통합 호스팅 & 인프라 규칙 (필수 준수)

이 프로젝트는 **Wavit Studio (`wavit-studio.com`) 인프라의 일부**로 운영됩니다. 다른 PC나 다른 세션에서 작업할 때 아래 규칙을 반드시 준수해야 합니다.
상세한 전체 호스팅 아키텍처 및 라우팅 명세는 루트의 [`HOSTING_GUIDE.md`](./HOSTING_GUIDE.md)를 참조하세요.

1. **포트 격리 원칙 (Port Isolation)**:
   - **`WAVIT_studio_2` (본 프로젝트)**: Cloudflare Pages 무중단 클라우드 호스팅 (`https://wavit-studio.com`, `main` 브랜치 푸시 시 GitHub Actions 자동 배포)
   - **`schedule-tracker` (Schedule)**: 로컬 호스팅 PC의 반드시 **포트 3000** 고정 (`http://localhost:3000` ➔ `https://schedule.wavit-studio.com`)
   - **`virtualindex`**: 로컬 호스팅 PC의 반드시 **포트 3001** 고정 (`http://localhost:3001` ➔ `https://virtualindex.wavit-studio.com`)
2. **배포 워크플로**:
   - `main` 브랜치에 코드를 푸시하면 `.github/workflows/deploy.yml`이 실행되어 Cloudflare Pages로 20~30초 내에 자동 배포됩니다.
3. **프로세스 관리 주의**:
   - 로컬 서비스 관리 스크립트에서 `taskkill /F /IM node.exe`와 같이 **모든 node 프로세스를 일괄 종료하는 명령어를 절대 사용하지 마세요.**
