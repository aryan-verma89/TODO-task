document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToColumn('backlog', taskText);
            taskInput.value = '';
        }
    });

    function addTaskToColumn(columnId, taskText) {
        const list = document.getElementById(`${columnId}-list`);
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${taskText}
            <button class="move-button move-left ${getButtonClass(columnId, 'left')}">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="move-button move-right ${getButtonClass(columnId, 'right')}">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        list.appendChild(listItem);

        // Attach event listeners to buttons
        listItem.querySelector('.move-left').addEventListener('click', () => moveTask(listItem, columnId, 'left'));
        listItem.querySelector('.move-right').addEventListener('click', () => moveTask(listItem, columnId, 'right'));
    }

    function moveTask(listItem, currentColumnId, direction) {
        const taskText = listItem.textContent.replace('←', '').replace('→', '').trim();
        const columns = ['backlog', 'todo', 'ongoing', 'done'];
        const currentIndex = columns.indexOf(currentColumnId);

        let nextColumnId;
        if (direction === 'left') {
            nextColumnId = columns[currentIndex - 1] || currentColumnId; // Keep task in current column if at start
        } else {
            nextColumnId = columns[currentIndex + 1] || currentColumnId; // Keep task in current column if at end
        }

        if (nextColumnId !== currentColumnId) {
            // Remove task from current column
            listItem.remove();
            // Add task to the next column
            addTaskToColumn(nextColumnId, taskText);
        }
    }

    function getButtonClass(columnId, direction) {
        if (direction === 'left') {
            return (columnId === 'backlog') ? 'inactive button-disabled' : 'active';
        } else if (direction === 'right') {
            return (columnId === 'done') ? 'inactive button-disabled' : 'active';
        }
    }
});
