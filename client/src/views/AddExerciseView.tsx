import AddExerciseType from "../components/EditWorkOutPlan/AddExerciseType";
import ExerciseList from "../components/EditWorkOutPlan/ExerciseList";
import SearchBar from "../components/EditWorkOutPlan/SearchBar";
import "./css/AddExerciseView.css";
import Header from "../components/WorkOutPlan/Header";

interface EditAddExerciseProps {
  onBack: () => void
  navigateToCurrentWorkout: () => void
}

export const EditAddExercise: React.FC<EditAddExerciseProps> = ({ onBack, navigateToCurrentWorkout }) => {

  return (
    <div>
        < Header/>
      <div className="header-container-addExercise">
        <h1 className="header-title">Add Exercise</h1>
        <button
          className="back-button"
          onClick={onBack}
        >
          Back
        </button>
      </div>
      <div className="search-add-container">
        <SearchBar />
        <AddExerciseType />
      </div>
      <div className="exercise-list-container">
        <ExerciseList navigateToCurrentWorkout={navigateToCurrentWorkout} />
      </div>
    </div>
  );
};
