const Home = () => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center md:flex-row-reverse landscape:flex-row md:landscape:flex-row-reverse my-4 landscape:my-[5vh]">
        <img
          src="/images/section1.png"
          alt="coffee"
          className="w-[80%] md:w-[50%] xl:w-[40%] landscape:w-[50%] xl:landscape:w-[40%]"
        />
        <div className="w-full text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="my-2 xl:my-4">
            Better beans
            <br /> Better coffee
            <br />
            Better life
          </h1>
          <h2 className="w-[80%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </h2>
          <button className="bg-primary-color text-white h-12 xs:h-16 lg:h-20 md:w-[14rem] my-2 w-[80%] rounded-md xs:rounded-lg lg:rounded-xl lg:my-4 xl:my-6">
            SHOP NOW
          </button>
        </div>
      </section>
      <section className="flex flex-col items-center md:flex-row landscape:flex-row md:landscape:flex-row my-4 landscape:my-[5vh]">
        <img
          src="/images/section2.png"
          alt="coffee"
          className="w-[80%] md:w-[50%] xl:w-[40%] landscape:w-[50%] xl:landscape:w-[40%]"
        />
        <div className="w-full text-center md:text-right flex flex-col items-center md:items-end">
          <h1 className="my-2 xl:my-4">
            Lets make your
            <br />
            coffee better
          </h1>
          <h2 className="w-[80%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
