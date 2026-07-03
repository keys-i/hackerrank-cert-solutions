using System;
using System.Collections.Generic;
using System.IO;

namespace Solution
{

    public class NotesStore
    {
        private readonly Dictionary<string, List<string>> notes;

        public NotesStore()
        {
            notes = new Dictionary<string, List<string>>
            {
                { "completed", new List<string>() },
                { "active", new List<string>() },
                { "others", new List<string>() }
            };
        }

        public void AddNote(string state, string name)
        {
            if (name == "")
                throw new Exception("Name cannot be empty");

            if (!notes.ContainsKey(state))
                throw new Exception("Invalid state " + state);

            notes[state].Add(name);
        }

        public List<string> GetNotes(string state)
        {
            if (!notes.ContainsKey(state))
                throw new Exception("Invalid state " + state);

            return notes[state];
        }
    }
    
    public class Solution
    {
        public static void Main() 
        {
            var notesStoreObj = new NotesStore();
            var n = int.Parse(Console.ReadLine());
            for (var i = 0; i < n; i++) {
                var operationInfo = Console.ReadLine().Split(' ');
                try
                {
                    if (operationInfo[0] == "AddNote")
                        notesStoreObj.AddNote(operationInfo[1], operationInfo.Length == 2 ? "" : operationInfo[2]);
                    else if (operationInfo[0] == "GetNotes")
                    {
                        var result = notesStoreObj.GetNotes(operationInfo[1]);
                        if (result.Count == 0)
                            Console.WriteLine("No Notes");
                        else
                            Console.WriteLine(string.Join(",", result));
                    } else {
                        Console.WriteLine("Invalid Parameter");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error: " + e.Message);
                }
            }
        }
    }
}
