const TestimonialCard = ({ name, paragraph }) => {
    return (
        <div className="testimonial-card lg:w-96 w-80 flex-shrink-0 p-4 border border-gray-300 rounded-lg">
            <h1 className="text-3xl font-extrabold">{name}</h1>
            <p>{paragraph}</p>
        </div>
    );
};

export default TestimonialCard;