console.log("test123");
const res = await fetch("/api/posts");
const posts = await res.json();

const feed = document.querySelector("#feed");

for (const post of posts) {
    const article = document.createElement("article");

    const profilePicture = document.createElement("img");
    profilePicture.src = post.profilePicture;
    profilePicture.alt = `${post.creator}'s profile picture`;
    
    const creator = document.createElement("p");
    creator.textContent = `@${post.creator}`;

    const date = document.createElement("time");
    date.dateTime = post.datePosted;
    date.textContent = `${post.datePosted}`;

    const image = document.createElement("img");
    image.src = post.image;
    image.alt = `Post by ${post.creator}`;

    article.append(
        profilePicture,
        creator,
        date,
        image
    );

    if (post.caption !== null) {
        const caption = document.createElement("p");
        caption.textContent = `Caption: ${post.caption}`;
        article.append(caption);
    }

    feed.append(article);
    
}