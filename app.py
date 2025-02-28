from datetime import date
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Your Task class (as before)
class Task:
    def __init__(self, name: str, duration_min: int, split_up: bool, min_split=45, max_split=90, due_date=None, schedule_after=None, priority=None, placement=None, notes=None):
        self.name = name
        self.duration_min = duration_min
        self.split_up = split_up
        self.min_split = min_split
        self.max_split = max_split
        if not (due_date is None or isinstance(due_date, date)):
            raise ValueError("due_date must be a datetime.date object or None")
        self.due_date = due_date
        if not (schedule_after is None or isinstance(schedule_after, date)):
            raise ValueError("schedule_after must be a datetime.date object or None")
        self.schedule_after = schedule_after
        self.priority = priority
        self.placement = placement
        self.notes = notes

    def __str__(self):
        s = f"Task: {self.name}, Duration: {self.duration_min} min, Split: {self.split_up}"
        due_str = self.due_date.strftime('%Y-%m-%d') if self.due_date else "None"
        s += f", Due: {due_str}"
        after_str = self.schedule_after.strftime('%Y-%m-%d') if self.schedule_after else "None"
        s += f", After: {after_str}"
        s += f", Priority: {self.priority if self.priority is not None else 'None'}"
        s += f", Placement: {self.placement if self.placement is not None else 'None'}"
        s += f", Notes: {self.notes if self.notes is not None else 'None'}"
        return s

# In-memory task storage
tasks = []

@app.route('/', methods=['GET', 'POST'])
def add_task():
    if request.method == 'POST':
        try:
            name = request.form['name']
            duration_min = int(request.form['duration_min']) if request.form['duration_min'] else 0
            split_up = 'split_up' in request.form
            
            due_date_str = request.form['due_date']
            due_date = date.fromisoformat(due_date_str) if due_date_str else None
            
            schedule_after_str = request.form['schedule_after']
            schedule_after = date.fromisoformat(schedule_after_str) if schedule_after_str else None
            
            priority = request.form['priority'] or None
            placement = request.form['placement'] or None
            notes = request.form['notes'] or None

            if not name or duration_min <= 0:
                raise ValueError("Name and a positive duration are required.")

            task = Task(name, duration_min, split_up, due_date=due_date, schedule_after=schedule_after,
                        priority=priority, placement=placement, notes=notes)
            tasks.append(task)
            flash(f"Task added successfully: {task}", "success")
            return redirect(url_for('add_task'))

        except ValueError as e:
            flash(str(e), "error")
        except Exception as e:
            flash(f"Invalid input: {e}", "error")

    return render_template('add_task.html', tasks=tasks)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
