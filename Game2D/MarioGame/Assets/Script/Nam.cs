using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Nam : MonoBehaviour
{
    GameObject Mario;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.collider.tag.Equals("Player"))
        {
            Destroy(gameObject);
            Mario.GetComponent<MarioScript>().capdo++;
            Mario.GetComponent<MarioScript>().bienhinh = true;
        }
    }
}
