import { IPost } from "../models/IPost";
import { renderLoginCard } from "./Login";

const app = document.getElementById('app') as HTMLDivElement;
let contentCard = "";

async function getPosts(): Promise<IPost[]> {
    const response = await fetch("http://localhost:3000/posts/all");
    const data = await response.json();
    return data;
}

export function renderContentCard(username: string) {

    contentCard = `
        <div class="content-card">
            <h2>Welcome ${username}</h2>
            <div class="post-form">
                <input id="titleInput" type="text" placeholder="Title" />
                <textarea id="contentInput" placeholder="Content"></textarea>
                <div class="content-card-btns">
                    <button id="submitBtn">Submit</button>
                    <button id="logoutBtn">Log out</button>
                </div>
            </div>
            <div id="postContainer" class="post-container"></div>
        </div>
    `;
    renderPosts();
}

function renderPosts() {
    getPosts().then(posts => {
        const postContainer = document.getElementById('postContainer') as HTMLDivElement;
        postContainer.innerHTML = "";
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

    handleSubmitClick();
    handleLogoutClick();
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

function handleSubmitClick() {
    (document.getElementById('submitBtn') as HTMLButtonElement)?.
    addEventListener('click', () => {
        const titleInput = document.getElementById('titleInput') as HTMLInputElement;
        const contentInput = document.getElementById('contentInput') as HTMLInputElement;
        const author = localStorage.getItem('username');

        const post = {
            author: author? author : "Anonymous",
            title: titleInput.value,
            content: contentInput.value,
            date: new Date()
        }
    
        createPost(post);

        titleInput.value = "";
        contentInput.value = "";
    });
}

function handleLogoutClick() {
    (document.getElementById('logoutBtn') as HTMLButtonElement)?.
    addEventListener('click', async () => {
        const loggedInUser = localStorage.getItem('username');
        const response = await fetch("http://localhost:3000/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { username: loggedInUser } )
            });
            await response.json();
            localStorage.removeItem('username');
            renderLoginCard();
        });
}
