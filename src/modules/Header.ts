const app = document.getElementById('app') as HTMLDivElement;

export default function Header() {
    app.innerHTML = `
      <header>
        <h1>Digital Guestbook</h1>
      </header>
    `;
  }