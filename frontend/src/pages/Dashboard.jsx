import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());
 
  }, [user, navigate, isError, message, dispatch]);

  const profile=(e)=>{
  e.preventDefault()
  navigate('/profile')
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
    <div className="dashboard-content">

   
      <section className="heading">
        <h1>Goals Dashboard</h1>
        <p>Welcome {user && user.name}</p>
      </section>

<div className="goals-content">
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <p>You have not set any goals</p>
        )}
      </section>
      </div>
      </div>
    </>
    
  );
}

export default Dashboard;