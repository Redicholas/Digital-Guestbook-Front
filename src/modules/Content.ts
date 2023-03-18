const app = document.getElementById('app') as HTMLDivElement;

export function renderContentCard(username: string) {

    const contentCard = `
        <div class="content-card">
            <h2>Welcome ${username}</h2>
        </div>
    `;

    if (app) app.innerHTML = contentCard;
}