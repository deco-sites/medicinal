function handleLoadScript(src: string, onLoadCallBack: () => void) {
	const script = document.createElement('script')
	script.src = src
	script.async = true

	script.onload = () => {
		onLoadCallBack()
	}
	document.head.appendChild(script)
}

function handleLoadCss(styles: string) {
	const style = document.createElement('style')
	style.innerHTML = styles
	document.head.appendChild(style)
}

function handleSetScope() {
	// window.vtexid.setScope('5d9f2d19-f9b8-4999-bbcd-0271c714b462')
	// window.vtexid.setScopeName('tfcucl')
}

export function loadVtexIdScripts(callBack: () => void) {
	handleLoadCss(`
    @charset "UTF-8";
    #vtexIdContainer button {
      outline: none !important;
    }
    #vtexIdContainer .vtexIdUI .vtexIdUI-auth-code .vtexIdUI-code-field {
      position: relative;
    }
    #vtexIdContainer .vtexIdUI .vtexIdUI-auth-code .vtexIdUI-code-field:before {
      content: "Chave de acesso";
      font-family: Inter, sans-serif;
      font-size: 11px;
      font-weight: 500;
      position: absolute;
      top: 11px;
      left: 16px;
      line-height: 8px;
      z-index: 10;
      color: #8e8e8d;
    }
    #vtexIdContainer .vtexIdUI .vtexIdUI-auth-code #access-code {
      text-align: start;
      padding: 15px 16px 0;
    }
    #vtexIdContainer .vtexIdUI-heading > span {
      color: #3c3c3b;
      font-family: Lemon Milk, Inter, sans-serif;
      font-weight: 700;
      padding-right: 30px;
      display: block;
    }
    #vtexIdContainer .modal-header {
      background-color: #fff;
    }
    #vtexIdContainer .modal-header .vtexIdUI-user {
      font-family: Inter, sans-serif;
      font-size: 12px;
      font-weight: 400;
    }
    #vtexIdContainer .modal-body {
      padding-bottom: 0;
    }
    #vtexIdContainer .modal-footer {
      background-color: #fff;
      border: none;
      padding: 0 15px 20px;
    }
    #vtexIdContainer .vtexIdUI-classic-login-control a {
      font-family: Inter, sans-serif;
      font-weight: 700;
      font-size: 14px;
      color: #3c3c3b;
    }
    #vtexIdContainer .vtexIdUI-classic-login-control .control-label {
      position: relative;
    }
    #vtexIdContainer .vtexIdUI-classic-login-control .control-label span {
      font-family: Inter, sans-serif;
      font-size: 11px;
      font-weight: 500;
      position: absolute;
      top: 32px;
      left: 17px;
      line-height: 8px;
      z-index: 10;
      color: #8e8e8d;
    }
    #vtexIdContainer .vtexIdUI-classic-login-control.email-model span {
      top: 16px;
    }
    #vtexIdContainer .vtexIdUI-classic-login-control #inputPassword,
    #vtexIdContainer .vtexIdUI-classic-login-control.email-model #inputEmail {
      padding-top: 15px;
    }
    #vtexIdContainer .vtexIdUI-close {
      background-color: transparent;
      font-size: 0;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 24px;
      height: 24px;
      display: block;
      top: 16px;
      right: 16px;
    }
    #vtexIdContainer .vtexIdUI {
      border: none;
      border-radius: 20px;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.03);
    }
    #vtexIdContainer h4 {
      font-family: Inter, sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #3c3c3b;
    }
    #vtexIdContainer .vtexIdUI .vtexIdUI-auth-code .info-code {
      text-align: left;
      background: #fff;
    }
    #vtexIdContainer .vtexIdUI .vtexIdUI-auth-code .vtexIdUI-code-field {
      width: 100%;
    }
    #vtexIdContainer .vtexIdUI-change-pswd input,
    #vtexIdContainer .vtexIdUI-classic-login input,
    #vtexIdContainer .vtexIdUI-confirm-email input {
      padding: 0 16px;
    }
    #vtexIdContainer .vtexIdUI-auth-code input,
    #vtexIdContainer .vtexIdUI-change-pswd input,
    #vtexIdContainer .vtexIdUI-classic-login input,
    #vtexIdContainer .vtexIdUI-confirm-email input {
      width: 100% !important;
      max-width: unset !important;
      box-sizing: border-box;
      box-shadow: none;
      color: #3c3c3b;
      font-size: 13px;
      font-weight: 500;
      font-family: Inter, sans-serif;
      height: 100%;
      border: 1px solid #e2e2e2;
      border-radius: 6px;
      line-height: 9px;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.03);
      height: 48px;
    }
    #vtexIdContainer .vtexIdUI-auth-code .vtexIdUI-back-link,
    #vtexIdContainer .vtexIdUI-change-pswd .vtexIdUI-back-link,
    #vtexIdContainer .vtexIdUI-classic-login .vtexIdUI-back-link,
    #vtexIdContainer .vtexIdUI-confirm-email .vtexIdUI-back-link {
      width: 49%;
      background-color: #fff;
      border: 2px solid #3c3c3b;
      border-radius: 6px;
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #3c3c3b;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      margin: 0;
      text-decoration: none;
    }
    @media screen and (max-width: 489px) {
      #vtexIdContainer .vtexIdUI-auth-code .vtexIdUI-back-link,
      #vtexIdContainer .vtexIdUI-change-pswd .vtexIdUI-back-link,
      #vtexIdContainer .vtexIdUI-classic-login .vtexIdUI-back-link,
      #vtexIdContainer .vtexIdUI-confirm-email .vtexIdUI-back-link {
        width: 100%;
        margin-bottom: 8px;
      }
    }
    #vtexIdContainer .vtexIdUI-auth-code .vtexIdUI-back-link:before,
    #vtexIdContainer .vtexIdUI-change-pswd .vtexIdUI-back-link:before,
    #vtexIdContainer .vtexIdUI-classic-login .vtexIdUI-back-link:before,
    #vtexIdContainer .vtexIdUI-confirm-email .vtexIdUI-back-link:before {
      content: "";
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 12.666L3.333 8m0 0L8 3.333M3.333 8h9.334' stroke='%233C3C3B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 16px;
      height: 16px;
      display: block;
      margin-right: 24px;
    }
    #vtexIdContainer
      .vtexIdUI-auth-code
      .vtexIdUI-back-link
      .vtexid-icon-arrow-left,
    #vtexIdContainer
      .vtexIdUI-change-pswd
      .vtexIdUI-back-link
      .vtexid-icon-arrow-left,
    #vtexIdContainer
      .vtexIdUI-classic-login
      .vtexIdUI-back-link
      .vtexid-icon-arrow-left,
    #vtexIdContainer
      .vtexIdUI-confirm-email
      .vtexIdUI-back-link
      .vtexid-icon-arrow-left {
      display: none;
    }
    #vtexIdContainer .vtexIdUI-auth-code #classicLoginBtn,
    #vtexIdContainer .vtexIdUI-auth-code #sendAccessKeyBtn,
    #vtexIdContainer .vtexIdUI-auth-code #tryChangePswdBtn,
    #vtexIdContainer .vtexIdUI-change-pswd #classicLoginBtn,
    #vtexIdContainer .vtexIdUI-change-pswd #sendAccessKeyBtn,
    #vtexIdContainer .vtexIdUI-change-pswd #tryChangePswdBtn,
    #vtexIdContainer .vtexIdUI-classic-login #classicLoginBtn,
    #vtexIdContainer .vtexIdUI-classic-login #sendAccessKeyBtn,
    #vtexIdContainer .vtexIdUI-classic-login #tryChangePswdBtn,
    #vtexIdContainer .vtexIdUI-confirm-email #classicLoginBtn,
    #vtexIdContainer .vtexIdUI-confirm-email #sendAccessKeyBtn,
    #vtexIdContainer .vtexIdUI-confirm-email #tryChangePswdBtn {
      background: linear-gradient(270deg, #e9530e, #e4003f) !important;
      background-image: none;
      border: none;
      border-radius: 6px;
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
      box-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      width: 49%;
    }
    @media screen and (max-width: 489px) {
      #vtexIdContainer .vtexIdUI-auth-code #classicLoginBtn,
      #vtexIdContainer .vtexIdUI-auth-code #sendAccessKeyBtn,
      #vtexIdContainer .vtexIdUI-auth-code #tryChangePswdBtn,
      #vtexIdContainer .vtexIdUI-change-pswd #classicLoginBtn,
      #vtexIdContainer .vtexIdUI-change-pswd #sendAccessKeyBtn,
      #vtexIdContainer .vtexIdUI-change-pswd #tryChangePswdBtn,
      #vtexIdContainer .vtexIdUI-classic-login #classicLoginBtn,
      #vtexIdContainer .vtexIdUI-classic-login #sendAccessKeyBtn,
      #vtexIdContainer .vtexIdUI-classic-login #tryChangePswdBtn,
      #vtexIdContainer .vtexIdUI-confirm-email #classicLoginBtn,
      #vtexIdContainer .vtexIdUI-confirm-email #sendAccessKeyBtn,
      #vtexIdContainer .vtexIdUI-confirm-email #tryChangePswdBtn {
        width: 100%;
      }
    }
    #vtexIdContainer .vtexIdUI-auth-code #classicLoginBtn:after,
    #vtexIdContainer .vtexIdUI-auth-code #sendAccessKeyBtn:after,
    #vtexIdContainer .vtexIdUI-auth-code #tryChangePswdBtn:after,
    #vtexIdContainer .vtexIdUI-change-pswd #classicLoginBtn:after,
    #vtexIdContainer .vtexIdUI-change-pswd #sendAccessKeyBtn:after,
    #vtexIdContainer .vtexIdUI-change-pswd #tryChangePswdBtn:after,
    #vtexIdContainer .vtexIdUI-classic-login #classicLoginBtn:after,
    #vtexIdContainer .vtexIdUI-classic-login #sendAccessKeyBtn:after,
    #vtexIdContainer .vtexIdUI-classic-login #tryChangePswdBtn:after,
    #vtexIdContainer .vtexIdUI-confirm-email #classicLoginBtn:after,
    #vtexIdContainer .vtexIdUI-confirm-email #sendAccessKeyBtn:after,
    #vtexIdContainer .vtexIdUI-confirm-email #tryChangePswdBtn:after {
      content: "";
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.333 4L6 11.333 2.667 8' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 16px;
      height: 16px;
      display: block;
      margin-left: 24px;
      flex-shrink: 0;
    }
    #vtexIdContainer .vtexIdUI-auth-code #tryChangePswdBtn,
    #vtexIdContainer .vtexIdUI-change-pswd #tryChangePswdBtn,
    #vtexIdContainer .vtexIdUI-classic-login #tryChangePswdBtn,
    #vtexIdContainer .vtexIdUI-confirm-email #tryChangePswdBtn {
      font-size: 0;
    }
    #vtexIdContainer .vtexIdUI-auth-code #tryChangePswdBtn:before,
    #vtexIdContainer .vtexIdUI-change-pswd #tryChangePswdBtn:before,
    #vtexIdContainer .vtexIdUI-classic-login #tryChangePswdBtn:before,
    #vtexIdContainer .vtexIdUI-confirm-email #tryChangePswdBtn:before {
      content: "Cadastrar senha";
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
    }
    #vtexIdContainer
      .vtexIdUI-auth-code
      .vtexIdUI-email-field:has(#appendedInputButton),
    #vtexIdContainer
      .vtexIdUI-change-pswd
      .vtexIdUI-email-field:has(#appendedInputButton),
    #vtexIdContainer
      .vtexIdUI-classic-login
      .vtexIdUI-email-field:has(#appendedInputButton),
    #vtexIdContainer
      .vtexIdUI-confirm-email
      .vtexIdUI-email-field:has(#appendedInputButton) {
      position: relative;
    }
    #vtexIdContainer
      .vtexIdUI-auth-code
      .vtexIdUI-email-field:has(#appendedInputButton):before,
    #vtexIdContainer
      .vtexIdUI-change-pswd
      .vtexIdUI-email-field:has(#appendedInputButton):before,
    #vtexIdContainer
      .vtexIdUI-classic-login
      .vtexIdUI-email-field:has(#appendedInputButton):before,
    #vtexIdContainer
      .vtexIdUI-confirm-email
      .vtexIdUI-email-field:has(#appendedInputButton):before {
      content: "Seu e-mail";
      font-family: Inter, sans-serif;
      font-size: 11px;
      font-weight: 500;
      position: absolute;
      top: 11px;
      left: 16px;
      line-height: 8px;
      z-index: 10;
      color: #8e8e8d;
    }
    #vtexIdContainer
      .vtexIdUI-auth-code
      .vtexIdUI-email-field:has(#appendedInputButton)
      #appendedInputButton,
    #vtexIdContainer
      .vtexIdUI-change-pswd
      .vtexIdUI-email-field:has(#appendedInputButton)
      #appendedInputButton,
    #vtexIdContainer
      .vtexIdUI-classic-login
      .vtexIdUI-email-field:has(#appendedInputButton)
      #appendedInputButton,
    #vtexIdContainer
      .vtexIdUI-confirm-email
      .vtexIdUI-email-field:has(#appendedInputButton)
      #appendedInputButton {
      padding-top: 15px;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .vtexid-icon-lock {
      display: none;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .modal-footer {
      display: flex;
      gap: 8px;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .modal-footer .vtexIdUI-back-link {
      width: auto;
      flex: 1;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .modal-footer #tryChangePswdBtn {
      width: fit-content;
    }
    #vtexIdContainer .vtexIdUI-change-pswd small span {
      font-family: Inter, sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #3c3c3b;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .control-group {
      position: relative;
    }
    #vtexIdContainer .vtexIdUI-change-pswd label {
      font-family: Inter, sans-serif;
      font-size: 11px;
      font-weight: 500;
      position: absolute;
      top: 11px;
      left: 16px;
      line-height: 8px;
      z-index: 10;
      color: #8e8e8d;
    }
    #vtexIdContainer .vtexIdUI-change-pswd input {
      padding: 15px 0 0 15px;
      margin: 0;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .vtexid-icon-checkmark {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 4.5l-8.25 8.25L3 9' stroke='%238CBF3C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 18px;
      height: 18px;
      position: absolute;
      top: 0;
      left: 8px;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .vtexid-icon-checkmark.ng-hide {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg class='vtex_icon-failure vtex_icon-failure--solid db' width='16' height='16' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z' fill='%23e4003f'/%3E%3C/svg%3E");
      display: block !important;
      width: 16px;
      height: 16px;
      background-position: 0;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .vtexid-password-requirements {
      padding: 24px 0;
      margin-top: 24px;
      border-top: 1px solid #d2d2d2;
      border-bottom: 1px solid #d2d2d2;
    }
    #vtexIdContainer
      .vtexIdUI-change-pswd
      .vtexid-password-requirements-description {
      font-size: 0;
    }
    #vtexIdContainer
      .vtexIdUI-change-pswd
      .vtexid-password-requirements-description:after {
      content: "Sua senha deve ter pelo menos:";
      font-family: Inter, sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #3c3c3b;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .vtexid-password-requirements-list {
      display: grid;
      grid-template-columns: auto auto;
      gap: 12px;
      padding-top: 12px;
      padding-left: 8px;
      margin: 0;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .vtexid-password-requirements-list li {
      position: relative;
      padding-left: 18px;
    }
    #vtexIdContainer .vtexIdUI-change-pswd .vtexid-password-requirements-list span {
      font-family: Inter, sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #3c3c3b;
    }
    #vtexIdContainer .vtexIdUI-providers-list li {
      margin-bottom: 8px;
    }
    #vtexIdContainer #loginWithUserAndPasswordBtn {
      height: 56px;
      background: linear-gradient(270deg, #e9530e, #e4003f) !important;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: none;
      border: none;
      border-radius: 6px;
      background-image: none;
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      text-shadow: none;
    }
    #vtexIdContainer #loginWithUserAndPasswordBtn:after {
      content: "";
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333a2.667 2.667 0 0 0-2.666 2.667V14m8-9.333a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0z' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 16px;
      height: 16px;
      display: block;
      margin-left: 25px;
    }
    #vtexIdContainer #vtexIdUI-google-plus {
      background-color: #3c3c3b;
      border: none;
      border-radius: 6px;
      background-image: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      height: 56px;
      box-shadow: none;
    }
    #vtexIdContainer #vtexIdUI-google-plus .vtexid-icon-google-plus,
    #vtexIdContainer #vtexIdUI-google-plus p {
      display: none;
    }
    #vtexIdContainer #vtexIdUI-google-plus:before {
      content: "Entrar com Google";
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      text-shadow: none;
    }
    #vtexIdContainer #vtexIdUI-google-plus:after {
      content: "";
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.334 7.837c0-.522-.042-1.044-.125-1.555H8.152v2.95h4.043a3.557 3.557 0 0 1-1.497 2.332v1.916h2.412c1.413-1.33 2.224-3.3 2.224-5.643z' fill='%23fff'/%3E%3Cpath d='M8.152 15.334c2.017 0 3.72-.682 4.958-1.853l-2.412-1.917c-.675.469-1.538.735-2.546.735-1.954 0-3.606-1.352-4.198-3.162H1.47v1.98c1.268 2.588 3.855 4.217 6.682 4.217z' fill='%23fff'/%3E%3Cpath d='M3.954 9.136a4.733 4.733 0 0 1 0-2.939v-1.97H1.47a7.767 7.767 0 0 0 0 6.88l2.484-1.97z' fill='%23fff'/%3E%3Cpath d='M8.152 3.035c1.07-.021 2.1.394 2.869 1.15l2.14-2.193A7.128 7.128 0 0 0 8.153 0C5.325 0 2.738 1.64 1.47 4.228l2.484 1.98c.592-1.82 2.244-3.173 4.198-3.173z' fill='%23fff'/%3E%3C/svg%3E");
      width: 16px;
      height: 16px;
      display: block;
      margin-left: 25px;
    }
    #vtexIdContainer #vtexIdUI-facebook {
      background-color: #3c3c3b;
      border: none;
      border-radius: 6px;
      background-image: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      height: 56px;
      box-shadow: none;
    }
    #vtexIdContainer #vtexIdUI-facebook .vtexid-icon-facebook,
    #vtexIdContainer #vtexIdUI-facebook p {
      display: none;
    }
    #vtexIdContainer #vtexIdUI-facebook:before {
      content: "Entrar com Facebook";
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      text-shadow: none;
    }
    #vtexIdContainer #vtexIdUI-facebook:after {
      content: "";
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 1.333h-2a3.333 3.333 0 0 0-3.333 3.333v2h-2v2.667h2v5.333h2.666V9.333h2L12 6.666H9.333v-2A.667.667 0 0 1 10 4h2V1.333z' fill='%23fff'/%3E%3C/svg%3E");
      width: 16px;
      height: 16px;
      display: block;
      margin-left: 25px;
    }
    #vtexIdContainer #vtexIdUI-confirm-access-code #confirmLoginAccessKeyBtn {
      background: linear-gradient(270deg, #e9530e, #e4003f) !important;
      background-image: none;
      border: none;
      border-radius: 6px;
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
      box-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      width: 49%;
    }
    @media screen and (max-width: 489px) {
      #vtexIdContainer #vtexIdUI-confirm-access-code #confirmLoginAccessKeyBtn {
        width: 100%;
      }
    }
    #vtexIdContainer #loginWithAccessKeyBtn {
      background-color: transparent;
      box-shadow: none;
      border-radius: 6px;
      border: 2px solid #e4003f;
      background-image: none;
      height: 56px;
    }
    #vtexIdContainer #loginWithAccessKeyBtn span {
      background-image: linear-gradient(270deg, #e9530e, #e4003f);
      background-clip: text;
      text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      text-shadow: none;
      font-size: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #vtexIdContainer #loginWithAccessKeyBtn span:before {
      font-family: Lemon Milk, Inter, sans-serif;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      content: "Receber uma chave de acesso rápido";
      display: block;
    }
    @media screen and (max-width: 489px) {
      #vtexIdContainer #loginWithAccessKeyBtn span:before {
        font-size: 11px;
      }
    }
    #vtexIdContainer #loginWithAccessKeyBtn span:after {
      content: "";
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M14.5 1.333l-1.333 1.333m0 0l2 2L12.833 7l-2-2m2.334-2.334L10.833 5m-2.74 2.74a3.667 3.667 0 1 1-5.185 5.185A3.667 3.667 0 0 1 8.093 7.74zm0 0L10.833 5' stroke='url(%23b)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='b' x1='15.167' y1='7.675' x2='1.879' y2='7.675' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23E9530E'/%3E%3Cstop offset='1' stop-color='%23E4003F'/%3E%3C/linearGradient%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' transform='translate(.5)' d='M0 0h16v16H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
      width: 17px;
      height: 16px;
      display: none;
      margin-left: 25px;
    }
    @media screen and (min-width: 980px) {
      #vtexIdContainer #loginWithAccessKeyBtn span:after {
        display: block;
      }
    }
    @media (max-width: 480px)
      .vtexIdUI {
        top: 50%;
        width: 90vw !important;
        margin-left: 0 !important;
        transform: translate(-50%, -50%);
      }
    }
  `)
	handleLoadScript(
		'https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js?v=*',
		() => {
			handleLoadScript(
				'https://io.vtex.com.br/vtex-id-ui/3.27.1/vtexid-jquery.min.js?v=*',
				() => {
					handleSetScope()
					callBack()
				},
			)
		},
	)
}
