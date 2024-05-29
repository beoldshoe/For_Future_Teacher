import MainTopNavBar from "../components/MainTopNavBar";
import SideBar from "../components/SideBar";

const NotCorrectQPage =() => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MainTopNavBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <SideBar />
                <div style={{ flex: 1, marginLeft: '20px' }}>
                    <h1>내가 틀린 문제</h1>
                    {/* 여기에 내 정보 수정 폼을 추가할 수 있습니다 */}
                </div>
            </div>
        </div>
    );
}

export default NotCorrectQPage;