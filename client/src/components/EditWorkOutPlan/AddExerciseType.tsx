import { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Exercise } from "../../types/types";
import { setCustomExercise } from "../../utils/exercise-utils";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddExerciseType = () => {
    const { AvailableExercises, setAvailableExercises } = useContext(AppContext);
    const { token, logout } = useAuth();
    const [newTypeWindowEnable, setNewTypeWindowEnable] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const newTypeWindowSwitch = (OnOff: boolean) => {
        setError(false);
        setNewTypeWindowEnable(OnOff);
    };

    const handleAddNewExerciseType = async (event: FormEvent<HTMLFormElement>) => {
        setError(false);
        event.preventDefault();
        const exerciseName = event.currentTarget.addExerciseName.value;
        const category = event.currentTarget.addExerciseCategory.value;
        if (!exerciseName || !category) {
            setError(true);
            return;
        }

        const newExercise: Exercise = {
            name: exerciseName,
            type: category,
        };

        const data = await setCustomExercise(token, newExercise);
        if (data.logout) {
            logout();
            navigate("/login");
        }
        setAvailableExercises([...AvailableExercises, newExercise]);
        newTypeWindowSwitch(false);
    };

    return (
        <div>
            <button className="new-button" onClick={() => newTypeWindowSwitch(true)}>
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
                                <select id="addExerciseCategory" name="addExerciseCategory" className="dropdown-AET">
                                    <option value="" disabled selected>
                                        Select Category
                                    </option>
                                    <option value="Chest">Chest</option>
                                    <option value="Legs">Back</option>
                                    <option value="Biceps">Legs</option>
                                    <option value="Triceps">Arms</option>
                                    <option value="Back">Cardio</option>
                                    <option value="Shoulders">Abs</option>
                                </select>
                            </div>
                            {error && <p>Please fill all fields</p>}
                            <div className="button-container-AET">
                                <button type="submit" className="modal-button-AET">
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
