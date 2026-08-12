const response = await fetch("/api/posts");
const posts = await response.json();

const feed = document.querySelector("#feed");

for (const post of posts) {
    const postElement = createPostElement(post);
    feed.append(postElement);
}

function createPostElement(post) {
    const article = document.createElement("article");
    article.classList.add("post-card");

    /* Header content: username, profile picture, and timestamp*/
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

    /* header */
    const image = document.createElement("img");
    image.classList.add("post-image");
    image.src = post.image;
    image.alt = `Post by ${post.creator}`;

    /* optional caption */
    article.append(header, image);

    if (post.caption !== null) {
        const caption = document.createElement("p");
        caption.classList.add("caption");
        caption.textContent = post.caption;

        article.append(caption);
    }

    return article;
}