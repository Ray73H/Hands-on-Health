import { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Exercise2 } from "../../types/types";

const AddExerciseType = () => {
  const { AvailableExercises, setAvailableExercises } = useContext(AppContext);
  const [newTypeWindowEnable, setNewTypeWindowEnable] = useState(false);

  const newTypeWindowSwitch = (OnOff: boolean) => {
    setNewTypeWindowEnable(OnOff);
  };

  const handleAddNewExerciseType = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exerciseName = event.currentTarget.addExerciseName.value;
    const category = event.currentTarget.addExerciseCategory.value;

    const newExercise: Exercise2 = {
      name: exerciseName,
      type: category,
      sets: [],
      notes: ""
    };

    setAvailableExercises([...AvailableExercises, newExercise]);
    newTypeWindowSwitch(false);
  };

  return (
      <div>
        <button
            className="new-button"
            onClick={() => newTypeWindowSwitch(true)}
        >
          New
        </button>
        {newTypeWindowEnable && (
            <div className="overlay-AET">
              <div className="modal-AET">
                <h2>New Exercise</h2>
                <form onSubmit={handleAddNewExerciseType}>
                  <div className="input-fields-AET">
                    <label htmlFor="addExerciseName">Exercise:</label>
                    <input
                        id="addExerciseName"
                        name="addExerciseName"
                        type="text"
                        placeholder="Enter Exercise Name"
                    />
                    <label htmlFor="addExerciseCategory">Category:</label>
                    <select
                        id="addExerciseCategory"
                        name="addExerciseCategory"
                        className="dropdown-AET"
                    >
                      <option value="" disabled selected>
                        Select Category
                      </option>
                      <option value="Chest">Chest</option>
                      <option value="Legs">Legs</option>
                      <option value="Biceps">Biceps</option>
                      <option value="Triceps">Triceps</option>
                      <option value="Back">Back</option>
                      <option value="Shoulders">Shoulders</option>
                      <option value="Default">Default</option>
                    </select>
                  </div>
                  <div className="button-container-AET">
                    <button
                        type="submit"
                        className="modal-button-AET"
                    >
                      Add
                    </button>
                    <button
                        type="button"
                        className="modal-button-AET"
                        onClick={() => newTypeWindowSwitch(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default AddExerciseType;
