import { IPost } from "../models/IPost";

const app = document.getElementById('app') as HTMLDivElement;
let contentCard = "";

async function getPosts(): Promise<IPost[]> {
    const response = await fetch("http://localhost:3000/posts/all");
    const data = await response.json();
    return data;
}

export async function renderContentCard(username: string) {

    contentCard = `
        <div class="content-card">
            <h2>Welcome ${username}</h2>
            <div class="post-form">
                <input id="titleInput" type="text" placeholder="Title" />
                <textarea id="contentInput" placeholder="Content"></textarea>
                <button id="submitBtn">Submit</button>
            </div>
            <div id="postContainer" class="post-container"></div>
        </div>
    `;
    renderPosts();
}

function renderPosts() {
    getPosts().then(posts => {
        const postContainer = document.getElementById('postContainer') as HTMLDivElement;
        posts.forEach(post => {
            const postCard = `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <small>By: ${post.author}</small>
                    <p>${post.content}</p>
                    <small>Date: ${post.date}</small>
                </div>`;
            postContainer.innerHTML += postCard;
        });
    });

    if (app) app.innerHTML = contentCard;
    renderSubmitBtn();
}

async function createPost(post: IPost) {

    const response = await fetch("http://localhost:3000/posts/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( post )
    });
    const data = await response.json();
    renderPosts();
    return data;
}

function renderSubmitBtn() {
    (document.getElementById('submitBtn') as HTMLButtonElement)?.addEventListener('click', () => {
        
        const titleInput = document.getElementById('titleInput') as HTMLInputElement;
        const contentInput = document.getElementById('contentInput') as HTMLInputElement;
    
        const post = {
            author: "test",
            title: titleInput.value,
            content: contentInput.value,
            date: new Date()
        }
    
        createPost(post);

        titleInput.value = "";
        contentInput.value = "";
    });
}