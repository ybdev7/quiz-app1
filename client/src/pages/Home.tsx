import { FC, ReactElement, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useGetQuizzes } from "../utils/QuizWorker";

const Home: FC<{}> = (): ReactElement => {
  const { status, error, data } = useGetQuizzes();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      console.log(`Home.useEffect - got ${data.length} quizzes`);
    }
  }, [data]);

  return (
    <>
      <div>
        {data?.map((item) => (
          <p key={item._id}>{item.title}</p>
        ))}
      </div>
    </>
  );
};

export default Home;
