pub enum Event {
    Result,
}

impl Event {
    pub fn str(&self) -> &'static str {
        match *self {
            Event::Result => "result",
        }
    }
}
