import React, {useState, useEffect} from 'react'

const AddNewForm = ({toggleAdd, setToggleAdd, savings, setSavings, setEditingSaving, editingSaving  }) => {
    const [addForm, setAddForm] = useState({
      title: '',
      amount: '',
      daily: '',
      });
      const [error, setError] = useState('');

      useEffect(() => {
        // If editingSaving is provided, fill the form fields with its values
        if (editingSaving) {
          setAddForm({
            title: editingSaving.title,
            amount: editingSaving.amount.toString(), // Convert amount to string
            daily: editingSaving.daily.toString(), // Convert daily to string
          });
        }
      }, [editingSaving]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setAddForm((prevForm) => ({ ...prevForm, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Form validation
    if (!addForm.title || !addForm.amount || !addForm.daily) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(addForm.title)) {
      setError('Title should contain only letters and spaces.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (!/^\d+$/.test(addForm.amount) || !/^\d+$/.test(addForm.daily)) {
      setError('Amount and Daily Savings should contain only numbers.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Clear previous errors
    setError('');
    
    
        const newTargetObject = {
          id: editingSaving ? editingSaving.id : new Date().getTime(),
          ...addForm,
        };
        
        if (editingSaving) {
          // Edit existing saving
          const updatedData = savings.map((saving) =>
            saving.id === editingSaving.id ? newTargetObject : saving
          );
          setSavings(updatedData);
          setEditingSaving(null);
          localStorage.setItem("newTarget", JSON.stringify(updatedData));
        } else {
          // Add new saving
          const updatedData = [...savings, newTargetObject];
          localStorage.setItem("newTarget", JSON.stringify(updatedData));
          console.log(updatedData);
          setSavings(updatedData);
        }

    
        // Clear the form after submission
        setAddForm({
          title: "",
          amount: "",
          daily: "",
        });
    
        // Close the form
        setToggleAdd(false);
        // setSavings(updatedData);
      };
      // const savingsData = JSON.parse(localStorage.getItem('newTarget'));
    
  return (
    <div className='z-50 bg-gray-400 bg-opacity-75 absolute overflow-hidden h-screen w-screen -top-20 left-0'>
        <h2 className='text-3xl float-right mr-16 mt-16 cursor-pointer' onClick={() => setToggleAdd(!toggleAdd)}>X</h2>
        <div className='lg:w-2/5 mx-auto w-4/5 bg mt-48 bg-white rounded-2xl p-10 z-50'>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
        <form action="#" className='flex flex-col'>
            <label htmlFor="savingTitle">Title</label>
            <input 
                type="text"
                id='savingTitle'
                name='title'
                value={addForm.title}
                onChange={handleChange}
                className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
            />
            <label htmlFor="savingAmount">Amount</label>
            <input 
                type="text"
                id='savingAmount'
                name='amount'
                value={addForm.amount}
                onChange={handleChange}
                className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
            />
            <label htmlFor="savingDaily">Daily Savings</label>
            <input 
                type="text"
                id='savingDaily'
                name='daily'
                value={addForm.daily}
                onChange={handleChange}
                className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
            />
            <button className='w-full mx-auto my-2 text-lg hover:bg-black hover:text-slightDark text-center bg-slightDark py-1 rounded-lg cursor-pointer mt-6' onClick={handleSubmit}>Set Saving</button>
        </form>
        </div>
    </div>
  )
}

export default AddNewForm