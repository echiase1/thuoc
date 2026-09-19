// Phát hiện thiết bị iOS và không chạy ở chế độ standalone
const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

if (isIos && !isInStandaloneMode) {
  const iosBanner = document.createElement('div');
  iosBanner.style.cssText = 'position:fixed;bottom:15px;left:15px;right:15px;background:#0f172a;color:#fff;padding:12px 16px;border-radius:12px;z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,0.4);font-size:13px;display:flex;align-items:center;justify-content:space-between;border:1px solid #0284c7;';
  iosBanner.innerHTML = `
    <span>📲 Cài đặt trên iPhone: Bấm nút <strong>Chia sẻ (⎋)</strong> trên Safari rồi chọn <strong>"Thêm vào MH chính"</strong>.</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:#94a3b8;font-size:18px;margin-left:8px;cursor:pointer;">✕</button>
  `;
  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(iosBanner);
  });
}
