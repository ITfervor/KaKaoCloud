import { useParams } from "react-router-dom";

//출력할 데이터 생성
const data = {
  adam: {
    name: "구운계란",
    description: "동일한 굽기는 어렵다",
  },
  jessica: {
    name: "제시카",
    description: "내가 하기싫은건 그냥 싫다",
  },
};

const Profile = () => {
  //URL파라미터 읽기
  const params = useParams();
  //데이터 찾아오기
  //username이라는 파라미터를 찾아온다.
  const profile = data[params.username];
  return (
    <div>
      <h1>사용자 프로필</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지않는 사용자</p>
      )}
    </div>
  );
};
export default Profile;
