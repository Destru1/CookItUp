import ClientOnly from "~/components/client-only";

const RequestPage = () => {
    return ( 
        <ClientOnly>
            <h1>Request Page</h1>
        </ClientOnly>
     );
}
 
export default RequestPage;