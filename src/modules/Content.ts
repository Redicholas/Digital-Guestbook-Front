const app = document.getElementById('app') as HTMLDivElement;

interface IPost {
    author: string,
    title: string,
    content: string,
    date: Date
}

async function getPosts(): Promise<IPost[]> {
    const response = await fetch("http://localhost:3000/posts/all");
    const data = await response.json();
    return data;
  }

export async function renderContentCard(username: string) {

    const contentCard = `
        <div class="content-card">
            <h2>Welcome ${username}</h2>
            <div id="post-container"></div>
        </div>
    `;

    getPosts().then(posts => {
        const postContainer = document.getElementById('post-container') as HTMLDivElement;
        posts.forEach(post => {
            // const dateposted = post.date.getFullYear() + "-" + (post.date.getMonth() + 1) + "-" + post.date.getDate();
            const postCard = `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <p>Author: ${post.author}</p>
                    <p>Date: ${post.date}</p>
                </div>`;
            postContainer.innerHTML += postCard;
        });
    });

    if (app) app.innerHTML = contentCard;
}