import React from "react"
import { render, fireEvent, waitFor } from '@testing-library/react'
import { RadioTable } from "./RadioTable"

describe("<RadioTable>", () => {
    const onChange = jest.fn()
    const columns = {
        letter: "Letter of alphabet",
        position: "Order in alphabet"
    }
    const options = [
        { value: "A", columns: { letter: "A", position: '1' } },
        { value: "B", columns: { letter: "B", position: '2' } },
        { value: "C", columns: { letter: "C", position: '3' } }
    ]

    afterEach(() => {
        onChange.mockReset()
    })

    it('renders a list of options in a table', () => {
        const { baseElement, getByLabelText } = render(<RadioTable
            name="alpha"
            label="Letter of the day"
            value=""
            options={options}
            columns={columns}
            labelColumn="letter"
            onChange={onChange}
        />)

        expect(baseElement).toHaveTextContent(/Letter of the day/i)

        fireEvent.click(getByLabelText(/A/i))
        fireEvent.click(getByLabelText(/B/i))
        fireEvent.click(getByLabelText(/C/i))

        expect(onChange).toHaveBeenCalledTimes(3)
        expect(onChange).toHaveBeenNthCalledWith(1, { "currentTarget": { "name": "alpha", "value": "A" } })
        expect(onChange).toHaveBeenNthCalledWith(2, { "currentTarget": { "name": "alpha", "value": "B" } })
        expect(onChange).toHaveBeenNthCalledWith(3, { "currentTarget": { "name": "alpha", "value": "C" } })
    })

    it('shows empty text if no options available', () => {
        const { baseElement } = render(<RadioTable
            name="alpha"
            label="Letter of the day"
            value=""
            options={[]}
            columns={columns}
            labelColumn="letter"
            empty="No letters here"
            onChange={onChange}
        />)

        expect(baseElement).toHaveTextContent(/Letter of the day/i)
        expect(baseElement).toHaveTextContent(/No letters here/i)
    })

    it('Allows options to be disabled', () => {
        const disabledOptions = [
            ...options,
            { value: "3", disabled: true, columns: { letter: "3", position: 'Not in alphabet' } },
        ]

        const { queryByLabelText, baseElement } = render(<RadioTable
            name="alpha"
            label="Letter of the day"
            value=""
            options={disabledOptions}
            columns={columns}
            labelColumn="letter"
            onChange={onChange}
        />)

        fireEvent.click(queryByLabelText(/A/i))
        expect(baseElement).toHaveTextContent(/3/i)
        expect(queryByLabelText(/3/i)).toBeFalsy()

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith({ "currentTarget": { "name": "alpha", "value": "A" } })
    })
})

