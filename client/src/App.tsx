import { gql, useQuery } from "@apollo/client";
import AddWilder from "./AddWilder";
import "./App.css";
import { CardRow, Container, Footer, Header } from "./styles/elements";
import Wilder from "./Wilder";

const ALL_WILDERS = gql`
  query GetAllWilders {
    wilders {
      _id
      name
      city
    }
  }
`;

export type WilderData = {
  _id: string;
  name: string;
  city: string;
};

function App() {
  const { loading, error, data } = useQuery<{ wilders: WilderData[] }>(
    ALL_WILDERS
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book with CD</h1>
        </Container>
      </Header>
      <Container>
        <AddWilder />
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {data?.wilders.map((wilder) => (
            <Wilder key={wilder._id} {...wilder} />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2025 Wild Code School Orleans</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
