import React, { useState } from 'react';
import '../styles/questionPage.css'


const Questions = () => {
  // Step tracking and user input states
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Duration: '',
    Muscles: '',
    Equipment: '',
    Difficulty: '',
  });

  const [showModal, setShowModal] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
  };

  const handleChange1 = (e) => {
    const {value, checked} = e.target
    setFormData((prevData) => {
      const musclesUpdated = checked
      ? [...prevData.Muscles, value]
      : prevData.Muscles.filter((muscle) => muscle !== value);

      return {
        ...prevData,
        Muscles: musclesUpdated
      };
    });
  };

  const handleChange2 = (e) => {
    const {value, checked} = e.target
    setFormData((prevData) => {
      const equipmentUpdated = checked
      ? [...prevData.Equipment, value]
      : prevData.Equipment.filter((equipment) => equipment !== value);

      return {
        ...prevData,
        Equipment: equipmentUpdated
      };
    });
  };

  const handleNext = () => {
    setShowModal(true);
  }

  const handleConfirm = () => {
    setShowModal(false);
    handleNextStep()
  }

  const handleCancel = () => {
    setShowModal(false);
  }
  // Handle the next step
  const handleNextStep = () => {
    console.log("Current Form Data:", formData);
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };


  const stepClass = (step) => {
    switch (step) {
      case 1:
        return 'step1';
      case 2:
        return 'step2';
      case 3:
        return 'step3';
      case 4:
        return 'step 4';
      default:
        return '';
    }
  };

  const handle1Hover = () => {
    alert("Choose a workout duration that fits your schedule. Even 15 minutes of exercise can make a difference!");
  }

  const handle2Hover = () => {
    alert("Not sure where to start? Try selecting one large muscle group and one smaller group for a full-body workout.");
  }

  const handle3Hover = () => {
    alert("Select the equipment you have available. If you don't have any equipment, no problem-choose 'Body Weight' for equipment-free exercises.");
  }

  const handle4Hover = () => {
    alert("Choose a difficulty level that challenges you but still allows you to maintain proper form.")
  }


  return (

    <div className="global-css">
      

    <div className={stepClass(step)}>
      {step === 1 && (
        <div>
          <div className="title-container">
            <h2>Duration?</h2>
            <img 
              src="/icon-info.png"
              alt="Info"
              className="info-icon"
              onMouseEnter={(handle1Hover)}
            />
          </div>
          <div className="step1Box">
          <p>Step 1 of 4: Select your desired workout duration from the options below </p>
    
          <select
            name="Duration"
            value={formData.Duration}
            onChange={handleChange}
          >
            <option value="">Select a duration</option>
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option>
            <option value="90">90 Minutes</option>
          </select>
            <p>Or enter a custom duration:</p>
            <input
              type="number"
              name="Duration"
              min="5"
              max="120"
              step="5"
              value={formData.Duration}
              onChange={(e)=> {
                handleChange(e);
              }}
              placeholder="Enter minutes"
              />
          <button onClick={handleNextStep}>Next</button>
          <div className="question-footer">
            <p>Please note: Selecting a shorter workout duration will result in fewer exercises, to ensure your <br /> 
                    workout fits within the time limit. For a more varied workout, consider choosing a longer duration.
            </p>
          </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="title-container">
            <h2>Muscles?</h2>
            <img 
                src="/icon-info.png"
                alt="Info"
                className="info-icon"
                onMouseEnter={(handle2Hover)}
              />
          </div>
          <div className="step2Box">
          <p>Step 2 of 4: Select your target muscle groups from the options below</p>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Abs"
            checked={formData.Muscles.includes('Abs')}
            onChange={handleChange1}
          />
          Abs
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Back"
            checked={formData.Muscles.includes('Back')}
            onChange={handleChange1}
          />
          Back
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Biceps"
            checked={formData.Muscles.includes('Biceps')}
            onChange={handleChange1}
          />
          Biceps
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Chest"
            checked={formData.Muscles.includes('Chest')}
            onChange={handleChange1}
          />
          Chest
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Glutes"
            checked={formData.Muscles.includes('Glutes')}
            onChange={handleChange1}
          />
          Glutes
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Hamstrings"
            checked={formData.Muscles.includes('Hamstrings')}
            onChange={handleChange1}
          />
          Hamstrings
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Quadriceps"
            checked={formData.Muscles.includes('Quadriceps')}
            onChange={handleChange1}
          />
          Quadricpes
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Shoulders"
            checked={formData.Muscles.includes('Shoulders')}
            onChange={handleChange1}
          />
          Shoulders
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Triceps"
            checked={formData.Muscles.includes('Triceps')}
            onChange={handleChange1}
          />
          Triceps
          </label>
          <label>
          <input
            type="checkbox"
            name="Muscles"
            value="Lower Back"
            checked={formData.Muscles.includes('Lower Back')}
            onChange={handleChange1}
          />
          Lower Back
          </label>
          <div class="button-container">
            <button onClick={handleBackStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
        </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
        <div className="title-container">
          <h2>Equipment?</h2>
          <img 
              src="/icon-info.png"
              alt="Info"
              className="info-icon"
              onMouseEnter={(handle3Hover)}
            />
        </div>
        <div className="step3Box">
        <p>Step 3 of 4: Select your available equipment from the options</p>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Dumbbells"
          checked={formData.Equipment.includes('Dumbbells')}
          onChange={handleChange2}
        />
        Dumbbells
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Kettlebells"
          checked={formData.Equipment.includes('Kettlebells')}
          onChange={handleChange2}
        />
        Kettlebells
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Body Weight"
          checked={formData.Equipment.includes('Body Weight')}
          onChange={handleChange2}
        />
        Body Weight
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Squat Rack"
          checked={formData.Equipment.includes('Squat Rack')}
          onChange={handleChange2}
        />
        Squat Rack
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Flat Bench"
          checked={formData.Equipment.includes('Flat Bench')}
          onChange={handleChange2}
        />
        Flat Bench
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Lat Machine"
          checked={formData.Equipment.includes('Lat Machine')}
          onChange={handleChange2}
        />
        Lat Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Barbells"
          checked={formData.Equipment.includes('Barbells')}
          onChange={handleChange2}
        />
        Barbells
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Leg Curl Machine"
          checked={formData.Equipment.includes('Leg Curl Machine')}
          onChange={handleChange2}
        />
        Leg Curl Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Leg Extension Machine"
          checked={formData.Equipment.includes('Leg Extension Machine')}
          onChange={handleChange2}
        />
        Leg Extension Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Seated Row Machine"
          checked={formData.Equipment.includes('Seated Row Machine')}
          onChange={handleChange2}
        />
        Seated Row Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Shoulder Press Machine"
          checked={formData.Equipment.includes('Shoulder Press Machine')}
          onChange={handleChange2}
        />
        Shoulder Press Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Treadmill"
          checked={formData.Equipment.includes('Treadmill')}
          onChange={handleChange2}
        />
        Treadmill
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Leg Press"
          checked={formData.Equipment.includes('Leg Press')}
          onChange={handleChange2}
        />
        Leg Press
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Chest Press"
          checked={formData.Equipment.includes('Chest Press')}
          onChange={handleChange2}
        />
        Chest Press
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Cable Machine"
          checked={formData.Equipment.includes('Cable Machine')}
          onChange={handleChange2}
        />
        Cable Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Pull Up Bar"
          checked={formData.Equipment.includes('Pull Up Bar')}
          onChange={handleChange2}
        />
        Pull Up Bar
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Elliptical"
          checked={formData.Equipment.includes('Elliptical')}
          onChange={handleChange2}
        />
        Elliptical
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Smith Machine"
          checked={formData.Equipment.includes('Smith Machine')}
          onChange={handleChange2}
        />
        Smith Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Ab Crunch Machine"
          checked={formData.Equipment.includes('Ab Crunch Machine')}
          onChange={handleChange2}
        />
        Ab Crunch Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Preacher Curl Machine"
          checked={formData.Equipment.includes('Preacher Curl Machine')}
          onChange={handleChange2}
        />
        Preacher Curl Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Bicep Curl Machine"
          checked={formData.Equipment.includes('Bicep Curl Machine')}
          onChange={handleChange2}
        />
        Bicep Curl Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Fly Machine"
          checked={formData.Equipment.includes('Fly Machine')}
          onChange={handleChange2}
        />
        Fly Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Thigh Adductor Machine"
          checked={formData.Equipment.includes('Thigh Adductor Machine')}
          onChange={handleChange2}
        />
        Thigh Adductor Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Tricep Dip Machine"
          checked={formData.Equipment.includes('Tricep Dip Machine')}
          onChange={handleChange2}
        />
        Tricep Dip Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Glute Kickback Machine"
          checked={formData.Equipment.includes('Glute Kickback Machine')}
          onChange={handleChange2}

        />
        Glute Kickback Machine
        </label>
        <label>
        <input
          type="checkbox"
          name="Equipment"
          value="Stair Master"
          checked={formData.Equipment.includes('Stair Master')}
          onChange={handleChange2}
        />
        Stair Master
        </label>
        <div className="button-container">
          <button onClick={handleBackStep}>Back</button>
          <button onClick={handleNext}>Next</button>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Confirm your equipment selection</h3>
                <ul>
                  {formData.Equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <div className="modal-footer">
                  <buttom onClick={handleConfirm}>Confirm</buttom>
                  <buttom onClick={handleCancel}>Cancel</buttom>
              </div>
            </div>
            </div>
          )}
        </div>
        </div>
      </div>
    )}
      {step === 4 && (
        <div>
          <div className="title-container">
            <h2>Difficulty?</h2>
            <img 
              src="/icon-info.png"
              alt="Info"
              className="info-icon"
              onMouseEnter={(handle4Hover)}
            />
          </div>
          <div className="step4Box">
          <p>Step 4 of 4: Select your desired workout difficulty from the options below </p>
    
        <select
          name="Difficulty"
          value={formData.Difficulty}
          onChange={handleChange}
        >
          <option value="">Select a Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <div class="button-container">
          <button onClick={handleBackStep}>Back</button>
        </div>
        </div>
      </div>
    )}
    </div>
    </div>
  );
};

export default Questions;