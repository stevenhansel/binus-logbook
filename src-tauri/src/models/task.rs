pub struct Task {
    pub title: String,
    pub tasks: Vec<Subtask>,
}

pub struct Subtask {
    pub step: i32,
    pub name: String,
}
