import {  useNavigate,useParams } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    const params = useParams();

    const handleBack = ()=>{
        document.startViewTransition(() => {
            navigate(-1)

            // flushSync(
            //     ()=>navigate(-1)
            // )
        })
    }

    return <div className="about container">
        <button onClick={handleBack} className="py-2 px-4 border 
      dark:bg-white dark:hover:bg-white/70 dark:active:bg-white/60 dark:text-black
      bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white mt-2">Go back</button>
        <section className="grid grid-cols-2 gap-8">
            <img className="dog-card w-full aspect-square" src={`https://placedog.net/300/300?id=${params.id}`} alt="" />
            <div className="info py-12 relative">
                <h1 className="text-3xl font-semibold">Eligendi excepturi in</h1>
                <h2 className="text-gray-500 mt-4">Occaecati blanditiis est mollitia similique in iure.</h2>
                <div className="add-to-cart text-right bottom-0 absolute right-0">
                    <p className="price font-semibold  text-lg">$129</p>
                    <p className="text-gray-500">a non ex,veritatis officiis ab</p>
                    <button className="py-2 px-4 border bg-blue-800 hover:bg-blue-700 active:bg-blue-600 text-white mt-2">Add To
                        Cart</button>
                </div>
            </div>
        </section>
        <section className="font-light text-lg">
            <p className="indent-[2em] mt-12">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim tempora, facilis corrupti, quibusdam, et id illo
                cumque veniam provident esse iusto voluptate officiis minus. Nisi molestias neque quasi magnam adipisci?
                Quia ea doloribus accusantium aut placeat voluptatem inventore. Ea cupiditate et necessitatibus. Quo vel dolores
                laboriosam ullam similique veritatis magni sed. Odit ex in molestiae nisi facere.
            </p>
            <p className="indent-[2em] mt-4">
                Aut sed amet. Perspiciatis voluptatibus voluptas atque nesciunt. Culpa nihil at sunt. Provident mollitia facilis
                omnis voluptatum velit dicta omnis consequatur consequuntur. Fuga molestiae et aperiam qui impedit consequatur
                voluptatem vero non.
            </p>
            <p className="indent-[2em] mt-4">
                Velit a cupiditate non nulla sit culpa accusamus. Nihil sit error velit vero perspiciatis velit et deserunt.
                Dolorem qui fugit debitis quae et explicabo eveniet aliquam. Odit assumenda eligendi sit iusto. Architecto nam
                et
                ullam et. Occaecati placeat in.
            </p>
        </section>
    </div>
}