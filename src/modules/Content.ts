const app = document.getElementById('app') as HTMLDivElement;

interface IPost {
    author: String,
    title: String,
    content: String,
    date: Date
}

async function getPosts(): Promise<IPost> {
    return fetch("http://localhost:3000/posts/all")
        .then(response => response.json())
        .then(data => {
            return data as IPost;
        });
}

export async function renderContentCard(username: string) {
    const post = await getPosts();
    console.log(post.author);
    
    const contentCard = `
        <div class="content-card">
            <h2>Welcome ${username}</h2>
            <div class="post-container">
                <h3>${post[0].author}</h3>
        </div>
    `;

    if (app) app.innerHTML = contentCard;
}