const response = await fetch("/api/posts");
const posts = await response.json();

const feed = document.querySelector("#feed");

if (posts.length === 0) {
    const message = document.createElement("p");
    message.classList.add("empty-feed-message");
    message.textContent = "There are currently no posts.";

    feed.append(message)
} else {

for (const post of posts) {
    feed.append(createPostElement(post));
}}

function createPostElement(post) {
    const article = document.createElement("article");
    article.classList.add("post-card");

    // Header
    const header = document.createElement("header");
    header.classList.add("post-header");

    const creatorSection = document.createElement("div");
    creatorSection.classList.add("post-creator");

    const profilePicture = document.createElement("img");
    profilePicture.classList.add("profile-picture");
    profilePicture.src = post.profilePicture;

    const username = document.createElement("span");
    username.textContent = `@${post.creator}`;

    creatorSection.append(profilePicture, username);

    const timestamp = document.createElement("time");
    timestamp.dateTime = post.datePosted;
    timestamp.textContent = post.datePosted;

    header.append(creatorSection, timestamp);

    // Post image
    const image = document.createElement("img");
    image.classList.add("post-image");
    image.src = post.image;
    image.alt = `Post by ${post.creator}`;

    article.append(header, image);

    // Optional caption
    if (post.caption !== null) {
        const caption = document.createElement("p");
        caption.classList.add("caption");
        caption.textContent = post.caption;

        article.append(caption);
    }

    return article;
}