package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
	"unicode/utf8"
)

/*
 * Complete the 'ModifyString' function below and add imports if needed.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING str as parameter.
 */

func ModifyString(str string) string {
    s := strings.TrimSpace(str)
    
    var b strings.Builder
    b.Grow(len(s))
    
    for len(s) > 0 {
        r, size := utf8.DecodeLastRuneInString(s)
        s = s[:len(s)-size]
        
        if r < '0' || r > '9' {
            b.WriteRune(r)
        }
    }
    
    return b.String()
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 16 * 1024 * 1024)

    stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 16 * 1024 * 1024)

    str := readLine(reader)

    result := ModifyString(str)

    fmt.Fprintf(writer, "%s\n", result)

    writer.Flush()
}

func readLine(reader *bufio.Reader) string {
    str, _, err := reader.ReadLine()
    if err == io.EOF {
        return ""
    }

    return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}

