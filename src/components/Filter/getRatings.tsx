const renderStarRating = (rating: any) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i}>&#9733;</span>);
    }

    if (halfStars === 1) {
        stars.push(<span key={stars.length}>&#9734;</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={stars.length}>&#9734;</span>);
    }

    return stars;
};

export default renderStarRating;