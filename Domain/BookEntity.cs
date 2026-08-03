using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class BookEntity
    {
        
        public string id { get; set; } //autogenerate 

        public string title { get; set; }  //obligatorio

        public string author { get; set; } // obligatorio

        public string genre { get; set; } = "General";

        public int year { get; set; }// = Range.StartAt(); //de 1450 a 2026 +1

        public string synopsis { get; set; }

        public bool available { get; set; } = true ;

    }
}
