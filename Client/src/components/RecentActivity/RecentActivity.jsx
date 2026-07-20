import "./RecentActivity.css";

function RecentActivity() {

  const activities =
    JSON.parse(localStorage.getItem("activity")) || [];

  return (

    <div className="activity-box">

      <h2>Recent Activity</h2>

      {activities.length === 0 ? (

        <p>No Activity Yet</p>

      ) : (

        <ul>

          {activities.map((item,index)=>(

            <li key={index}>
              {item}
            </li>

          ))}

        </ul>

      )}

    </div>

  );

}

export default RecentActivity;