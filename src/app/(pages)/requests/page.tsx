import getRecipes from "~/app/actions/getRecipes";
import ClientOnly from "~/components/client-only";
import RequestsClient from "./requests-client";
import EmptyState from "~/components/empty-state";

const RequestPage = async () => {
  const recipes = await getRecipes({ approved: "pending" });

  if(recipes.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No requests found."
          description="There are no requests to approve."
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
    <RequestsClient recipes={recipes} />
    </ClientOnly>
  );
};

export default RequestPage;
